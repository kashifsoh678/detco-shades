import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects, projectImages } from "@/db/schema/projects";
import { media } from "@/db/schema/media";
import { eq, desc, count, sql, and, inArray } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";

/**
 * GET /api/projects
 * Public: Fetch paginated list of active projects
 * Admin: Fetch paginated list of all projects if ?all=true
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const showAll = searchParams.get("all") === "true";
    const serviceId = searchParams.get("serviceId");
    const offset = (page - 1) * limit;

    let filters = [];
    if (!showAll) {
      filters.push(eq(projects.isActive, true));
    } else {
      const auth = await verifyAdmin();
      if (!auth.authenticated) {
        filters.push(eq(projects.isActive, true));
      }
    }

    if (serviceId) {
      filters.push(eq(projects.serviceId, serviceId));
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const [data, [totalResult]] = await Promise.all([
      db.query.projects.findMany({
        where: whereClause,
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
            orderBy: [desc(projectImages.order)],
          },
        },
        orderBy: [desc(projects.createdAt)],
        limit,
        offset,
      }),
      db.select({ count: count() }).from(projects).where(whereClause),
    ]);

    const total = totalResult.count;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("GET Projects Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/projects
 * Admin Only: Create a new project
 */
export async function POST(request: Request) {
  try {
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const body = await request.json();
    const {
      title,
      slug,
      location,
      serviceId,
      thumbnailId,
      description,
      imageIds, // Array of media IDs for gallery
      isActive,
    } = body;

    if (
      !title ||
      !slug ||
      !location ||
      !serviceId ||
      !thumbnailId ||
      !description
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await db.transaction(async (tx) => {
      // 1. Uniqueness Checks
      const existingSlug = await tx
        .select()
        .from(projects)
        .where(eq(projects.slug, slug))
        .limit(1);

      if (existingSlug.length > 0)
        throw new Error("A project with this slug already exists");

      // 2. Insert Project
      const [newProject] = await tx
        .insert(projects)
        .values({
          title,
          slug,
          location,
          serviceId,
          thumbnailId,
          description,
          isActive: isActive ?? true,
        })
        .returning();

      // 3. Insert Gallery Images
      if (imageIds && Array.isArray(imageIds) && imageIds.length > 0) {
        const imagesToInsert = imageIds.map((id, index) => ({
          projectId: newProject.id,
          imageId: id,
          order: index,
        }));

        await tx.insert(projectImages).values(imagesToInsert);

        // Update media status to 'attached'
        const allMediaIds = [thumbnailId, ...imageIds];
        await tx
          .update(media)
          .set({ status: "attached" })
          .where(inArray(media.id, allMediaIds));
      } else {
        // Just update thumbnail status
        await tx
          .update(media)
          .set({ status: "attached" })
          .where(eq(media.id, thumbnailId));
      }

      return newProject;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("POST Project Error:", error);
    if (error.message === "A project with this slug already exists") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
