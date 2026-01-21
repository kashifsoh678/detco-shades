import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects, projectImages } from "@/db/schema/projects";
import { media } from "@/db/schema/media";
import { eq, inArray, sql } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";

/**
 * GET /api/projects/[id]
 * Public: Fetch a single project by ID or Slug
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const project = await db.query.projects.findFirst({
      where: (projects, { or, eq }) =>
        or(eq(projects.id, id), eq(projects.slug, id)),
      with: {
        thumbnail: true,
        service: {
          columns: {
            id: true,
            title: true,
            slug: true,
          },
        },
        images: {
          with: {
            image: true,
          },
          orderBy: (projectImages, { asc }) => [asc(projectImages.order)],
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET Project Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/projects/[id]
 * Admin Only: Update a project
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const { id } = await params;
    const body = await request.json();
    const {
      title,
      slug,
      location,
      serviceId,
      thumbnailId,
      description,
      imageIds,
      isActive,
    } = body;

    const result = await db.transaction(async (tx) => {
      // 1. Check existence
      const existingProject = await tx.query.projects.findFirst({
        where: eq(projects.id, id),
        with: { images: true },
      });

      if (!existingProject) throw new Error("Project not found");

      // 2. Slug uniqueness if changed
      if (slug && slug !== existingProject.slug) {
        const slugExists = await tx.query.projects.findFirst({
          where: eq(projects.slug, slug),
        });
        if (slugExists) throw new Error("Slug already in use");
      }

      // 3. Update Project
      const [updatedProject] = await tx
        .update(projects)
        .set({
          title,
          slug,
          location,
          serviceId,
          thumbnailId,
          description,
          isActive,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, id))
        .returning();

      // 4. Update Gallery
      if (imageIds) {
        // Remove old images
        await tx.delete(projectImages).where(eq(projectImages.projectId, id));

        // Insert new ones
        if (imageIds.length > 0) {
          const imagesToInsert = imageIds.map(
            (imgId: string, index: number) => ({
              projectId: id,
              imageId: imgId,
              order: index,
            }),
          );
          await tx.insert(projectImages).values(imagesToInsert);
        }

        // Update media status (Mark new as attached, old as detached if no longer used)
        // This is complex, but for now we mark all in current update as 'attached'
        const allCurrentMediaIds = [thumbnailId, ...imageIds].filter(Boolean);
        if (allCurrentMediaIds.length > 0) {
          await tx
            .update(media)
            .set({ status: "attached" })
            .where(inArray(media.id, allCurrentMediaIds));
        }
      }

      return updatedProject;
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("PATCH Project Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: error.message === "Project not found" ? 404 : 400 },
    );
  }
}

/**
 * DELETE /api/projects/[id]
 * Admin Only: Delete a project
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const { id } = await params;

    await db.transaction(async (tx) => {
      const project = await tx.query.projects.findFirst({
        where: eq(projects.id, id),
        with: { images: true },
      });

      if (!project) throw new Error("Project not found");

      // Media status will be handled by a cleanup job or we can manually set to 'detached' here
      const mediaIds = [
        project.thumbnailId,
        ...project.images.map((img) => img.imageId),
      ].filter(Boolean);

      if (mediaIds.length > 0) {
        await tx
          .update(media)
          .set({ status: "detached" as any })
          .where(inArray(media.id, mediaIds as string[]));
      }

      await tx.delete(projects).where(eq(projects.id, id));
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Project Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: error.message === "Project not found" ? 404 : 500 },
    );
  }
}
