import { NextResponse } from "next/server";
import { generateSignature } from "@/lib/cloudinary";
import { verifyAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const body = await request.json();
    const { folder, ...rest } = body;

    if (!folder) {
      return NextResponse.json(
        { error: "Folder is required" },
        { status: 400 },
      );
    }

    const params = {
      folder: folder.startsWith("Home") ? folder : `Detco/${folder}`,
      // resource_type is NOT signed by Cloudinary, so we exclude it from ...rest
    };

    const { timestamp, signature } = generateSignature(params);

    return NextResponse.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    console.error("Signature Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
