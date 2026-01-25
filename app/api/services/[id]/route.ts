import { NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema/services";
import { media } from "@/db/schema/media";
import { eq, sql, and, ne } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * PATCH /api/services/[id]
 * Admin Only: Update a service
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const body = await request.json();
    const {
      title,
      slug,
      shortDescription,
      details,
      iconName,
      coverImageId,
      features,
      processSteps,
      isActive,
    } = body;

    // 1. Find existing service
    const existingService = await db.query.services.findFirst({
      where: eq(services.id, id),
      with: { coverImage: true },
    });

    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // 2. Uniqueness Checks (excluding current self)
    if (title && title !== existingService.title) {
      const conflict = await db
        .select()
        .from(services)
        .where(
          and(
            sql`lower(${services.title}) = lower(${title})`,
            ne(services.id, id),
          ),
        )
        .limit(1);
      if (conflict.length > 0)
        return NextResponse.json(
          { error: "A service with this title already exists" },
          { status: 400 },
        );
    }

    if (slug && slug !== existingService.slug) {
      const conflict = await db
        .select()
        .from(services)
        .where(and(eq(services.slug, slug), ne(services.id, id)))
        .limit(1);
      if (conflict.length > 0)
        return NextResponse.json(
          { error: "A service with this slug already exists" },
          { status: 400 },
        );
    }

    const isImageReplaced =
      coverImageId && coverImageId !== existingService.coverImageId;

    // 3. Transaction: Update service and handle media status
    const result = await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(services)
        .set({
          title,
          slug,
          shortDescription,
          details,
          iconName,
          coverImageId: coverImageId || null,
          features: features || existingService.features,
          processSteps: processSteps || existingService.processSteps,
          isActive:
            isActive !== undefined ? isActive : existingService.isActive,
          updatedAt: new Date(),
        })
        .where(eq(services.id, id))
        .returning();

      if (isImageReplaced) {
        // Mark new image as 'attached'
        if (coverImageId) {
          await tx
            .update(media)
            .set({ status: "attached" })
            .where(eq(media.id, coverImageId));
        }
        // Delete old image record from DB
        if (existingService.coverImageId) {
          await tx
            .delete(media)
            .where(eq(media.id, existingService.coverImageId));
        }
      }

      return updated;
    });

    // 4. Cloudinary Cleanup
    if (isImageReplaced && existingService.coverImage?.publicId) {
      try {
        await deleteFromCloudinary(existingService.coverImage.publicId);
      } catch (e) {
        console.error("Cloudinary Cleanup Error:", e);
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("PATCH Service Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/services/[id]
 * Admin Only: Delete a service and its associated media
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    // 1. Find service
    const serviceData = await db.query.services.findFirst({
      where: eq(services.id, id),
      with: { coverImage: true },
    });

    if (!serviceData) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const deletedOrder = serviceData.order;

    // 2. Transaction: Delete and Reorder
    await db.transaction(async (tx) => {
      await tx.delete(services).where(eq(services.id, id));

      // Reorder remaining
      await tx
        .update(services)
        .set({ order: sql`${services.order} - 1` })
        .where(sql`${services.order} > ${deletedOrder}`);

      // Cleanup Media DB record
      if (serviceData.coverImageId) {
        await tx.delete(media).where(eq(media.id, serviceData.coverImageId));
      }
    });

    // 3. Cloudinary Cleanup
    if (serviceData.coverImage?.publicId) {
      try {
        await deleteFromCloudinary(serviceData.coverImage.publicId);
      } catch (e) {
        console.error("Cloudinary Deletion Error:", e);
      }
    }

    return NextResponse.json({
      message: "Service deleted and order synchronized",
    });
  } catch (error) {
    console.error("DELETE Service Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
