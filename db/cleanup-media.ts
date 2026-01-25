import "dotenv/config";
import { cleanupOrphanedMedia } from "../lib/media-cleanup";

async function run() {
  const result = await cleanupOrphanedMedia();
  console.log(result);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
