import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { db } from "@/db";
import { media } from "@/db/schema/media";
import { verifyAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // 1. Auth Check (Zero Redundancy)
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const data = await request.formData();
    const file = data.get("file") as unknown as File;
    const folder = data.get("folder") as string;
    const fileName = (data.get("fileName") as string) || file.name;
    const resourceType = (data.get("resourceType") as string) || "auto";

    if (!file || !folder) {
      return NextResponse.json(
        { message: "File and folder are required" },
        { status: 400 },
      );
    }

    // Convert file to base64 for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // 2. Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(fileBase64, {
      folder: folder.startsWith("Home") ? folder : `Detco/${folder}`,
      resourceType: (resourceType as any) || "auto",
    });

    // 3. Track in Database as 'pending'
    const [insertedMedia] = await db
      .insert(media)
      .values({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        resourceType: (uploadResult.resource_type as any) || "image",
        status: "pending",
        folder: folder,
        fileName: fileName || file.name,
      })
      .returning();

    return NextResponse.json(insertedMedia, { status: 200 });
  } catch (error) {
    console.error("Upload Route Error:", error);
    return NextResponse.json(
      { message: "Internal server error during upload" },
      { status: 500 },
    );
  }
}
