import { NextResponse } from "next/server";
import { uploadFromStream } from "@/lib/cloudinary";
import { db } from "@/db";
import { media } from "@/db/schema/media";
import { verifyAdmin } from "@/lib/auth";
import { Readable } from "stream";

export const maxDuration = 300; // Extend to 5 minutes for heavy video files

export async function POST(request: Request) {
  try {
    // 1. Auth Check (Zero Redundancy)
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const data = await request.formData();
    const file = data.get("file") as unknown as File;
    const folder = data.get("folder") as string;
    const fileName =
      (data.get("fileName") as string) || (file ? file.name : "");
    const resourceType = (data.get("resourceType") as string) || "auto";

    // Support client-side uploaded data
    const alreadyUploaded = data.get("alreadyUploaded") === "true";
    const uploadedUrl = data.get("url") as string;
    const uploadedPublicId = data.get("publicId") as string;

    let uploadResult: any;

    if (alreadyUploaded) {
      if (!uploadedUrl || !uploadedPublicId) {
        return NextResponse.json(
          { message: "Metadata required for already uploaded files" },
          { status: 400 },
        );
      }
      uploadResult = {
        secure_url: uploadedUrl,
        public_id: uploadedPublicId,
        resource_type: resourceType,
      };
    } else {
      if (!file || !folder) {
        return NextResponse.json(
          { message: "File and folder are required" },
          { status: 400 },
        );
      }

      // Convert Web ReadableStream to Node.js Readable
      const nodeStream = Readable.fromWeb(file.stream() as any);

      // 2. Upload to Cloudinary using true streaming
      uploadResult = await uploadFromStream(nodeStream, {
        folder: folder.startsWith("Home") ? folder : `Detco/${folder}`,
        resourceType: (resourceType as any) || "auto",
      });
    }

    // 3. Track in Database as 'pending'
    const [insertedMedia] = await db
      .insert(media)
      .values({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        resourceType:
          (uploadResult.resource_type as any) ||
          (resourceType === "video" ? "video" : "image"),
        status: "pending",
        folder: folder,
        fileName: fileName,
      })
      .returning();

    return NextResponse.json(insertedMedia, { status: 200 });

    return NextResponse.json(insertedMedia, { status: 200 });
  } catch (error) {
    console.error("Upload Route Error:", error);
    return NextResponse.json(
      { message: "Internal server error during upload" },
      { status: 500 },
    );
  }
}
