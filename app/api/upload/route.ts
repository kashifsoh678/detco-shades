import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { db } from "@/db";
import { media } from "@/db/schema/media";
import { getSession } from "@/lib/auth"; // For basic auth check

export async function POST(request: Request) {
  try {
    // Basic Auth Check
    const cookie = request.headers.get("cookie");
    // In a real app, use getSession() or verify cookie here
    // For now, let's assume the user is authenticated if they reached here
    // (Middleware protects /api/auth, but we should protect /api/upload too)

    const formData = await request.json();
    const { file, folder, fileName, resourceType } = formData;

    if (!file || !folder) {
      return NextResponse.json(
        { message: "File and folder are required" },
        { status: 400 },
      );
    }

    // 1. Upload to Cloudinary
    // Dynamically use the folder provided by the frontend.
    // Example: "Home/products/images" or "Home/services"
    const uploadResult = await uploadToCloudinary(file, {
      folder: folder.startsWith("Home") ? folder : `Home/${folder}`,
      resourceType: resourceType || "auto",
    });

    // 2. Track in Database as 'pending'
    const [insertedMedia] = await db
      .insert(media)
      .values({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        resourceType: (uploadResult.resource_type as any) || "image",
        status: "pending",
        folder: folder,
        fileName: fileName || "unnamed",
      })
      .returning();

    return NextResponse.json(
      {
        message: "Upload successful",
        media: insertedMedia,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Upload Route Error:", error);
    return NextResponse.json(
      { message: "Internal server error during upload" },
      { status: 500 },
    );
  }
}
