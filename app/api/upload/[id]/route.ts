import { NextResponse } from "next/server";
import { db } from "@/db";
import { media } from "@/db/schema/media";
import { eq } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * DELETE /api/upload/[id]
 * Admin Only: Delete a media item from Cloudinary and DB
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // 1. Auth Check
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    // 2. Find Media
    const item = await db.query.media.findFirst({
      where: eq(media.id, id),
    });

    if (!item) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // 3. Delete from Cloudinary
    if (item.publicId) {
      try {
        await deleteFromCloudinary(item.publicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary Deletion Error:", cloudinaryError);
        // We might want to continue even if Cloudinary fails to keep DB clean
      }
    }

    // 4. Delete from Database
    await db.delete(media).where(eq(media.id, id));

    return NextResponse.json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("DELETE Media Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
