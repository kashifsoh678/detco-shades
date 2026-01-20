import { NextResponse } from "next/server";
import { db } from "@/db";
import { clients } from "@/db/schema/clients";
import { media } from "@/db/schema/media";
import { eq } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * PATCH /api/clients/[id]
 * Admin Only: Update a client
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
    const { name, imageId, order, isActive } = body;

    // 1. Find existing client to check for image replacement
    const existingClient = await db.query.clients.findFirst({
      where: eq(clients.id, id),
      with: { image: true },
    });

    if (!existingClient) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 },
      );
    }

    const isImageReplaced = imageId && imageId !== existingClient.imageId;

    // 2. Transaction: Update client and handle media cleanup/status
    const [updatedClient] = await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(clients)
        .set({
          name,
          imageId,
          order,
          isActive,
          updatedAt: new Date(),
        })
        .where(eq(clients.id, id))
        .returning();

      if (isImageReplaced) {
        // Mark new image as 'attached'
        await tx
          .update(media)
          .set({ status: "attached" })
          .where(eq(media.id, imageId));

        // Delete old image record from DB (Cloudinary cleanup happens after tx)
        await tx.delete(media).where(eq(media.id, existingClient.imageId));
      }

      return [updated];
    });

    // 3. Post-Transaction Cloudinary Cleanup (avoid rolling back DB if Cloudinary fails)
    if (isImageReplaced && existingClient.image?.publicId) {
      try {
        await deleteFromCloudinary(existingClient.image.publicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary Replacement Cleanup Error:", cloudinaryError);
      }
    }

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("PATCH Client Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/clients/[id]
 * Admin Only: Delete a client and its associated media
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    // 1. Find the client and associated media
    const clientData = await db.query.clients.findFirst({
      where: eq(clients.id, id),
      with: {
        image: true,
      },
    });

    if (!clientData) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 },
      );
    }

    // 2. Use a transaction to ensure both are deleted
    await db.transaction(async (tx) => {
      // Delete client first (not strictly necessary but cleaner)
      await tx.delete(clients).where(eq(clients.id, id));

      // 3. Delete from Cloudinary if media exists
      if (clientData.image?.publicId) {
        try {
          await deleteFromCloudinary(clientData.image.publicId);
          // 4. Delete media record
          await tx.delete(media).where(eq(media.id, clientData.imageId));
        } catch (cloudinaryError) {
          console.error("Cloudinary Cleanup Error:", cloudinaryError);
          // We continue anyway so the DB record doesn't become a ghost
        }
      }
    });

    return NextResponse.json({
      message: "Client and associated media deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Client Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
