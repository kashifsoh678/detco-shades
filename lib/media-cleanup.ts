import { db } from "@/db";
import { media } from "@/db/schema/media";
import { and, eq, lt } from "drizzle-orm";
import { deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * Cleanup orphaned media records that have been in 'pending' status
 * for more than 24 hours.
 */
export async function cleanupOrphanedMedia() {
  console.log("Starting orphaned media cleanup...");

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // 1. Find all pending media older than 24 hours
  const orphanedMedia = await db.query.media.findMany({
    where: and(eq(media.status, "pending"), lt(media.createdAt, oneDayAgo)),
  });

  if (orphanedMedia.length === 0) {
    console.log("No orphaned media found.");
    return { deletedCount: 0 };
  }

  console.log(
    `Found ${orphanedMedia.length} orphaned media records. Cleaning up...`,
  );

  let deletedCount = 0;

  for (const item of orphanedMedia) {
    try {
      // 2. Delete from Cloudinary
      await deleteFromCloudinary(item.publicId);

      // 3. Delete from Database
      await db.delete(media).where(eq(media.id, item.id));

      deletedCount++;
    } catch (error) {
      console.error(`Failed to cleanup media ${item.id}:`, error);
    }
  }

  console.log(`Cleanup complete. Deleted ${deletedCount} files.`);
  return { deletedCount };
}
