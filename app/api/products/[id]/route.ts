import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  products,
  productImages,
  productSpecs,
  productBenefits,
  productFaqs,
} from "@/db/schema/products";
import { media } from "@/db/schema/media";
import { eq, inArray } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * GET /api/products/[id]
 * Public/Admin: Fetch a single product by ID or Slug with all relations
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const product = await db.query.products.findFirst({
      where: (products, { or, eq }) =>
        or(eq(products.id, id), eq(products.slug, id)),
      with: {
        thumbnail: true,
        coverImage: true,
        video: true,
        images: {
          with: {
            image: true,
          },
          orderBy: (productImages, { asc }) => [asc(productImages.order)],
        },
        specs: {
          orderBy: (productSpecs, { asc }) => [asc(productSpecs.order)],
        },
        benefits: {
          orderBy: (productBenefits, { asc }) => [asc(productBenefits.order)],
        },
        faqs: {
          orderBy: (productFaqs, { asc }) => [asc(productFaqs.order)],
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET Product Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/products/[id]
 * Admin Only: Update a product and its nested content
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const { id } = await params;
    const body = await request.json();
    const {
      title,
      slug,
      shortDescription,
      description,
      applications,
      isFeatured,
      thumbnailId,
      coverImageId,
      videoId,
      isActive,
      order,
      imageIds, // Array of media IDs for gallery
      specs, // Array of { title, description }
      benefits, // Array of { title }
      faqs, // Array of { question, answer }
    } = body;

    const result = await db.transaction(async (tx) => {
      // 1. Check existence
      const existingProduct = await tx.query.products.findFirst({
        where: eq(products.id, id),
      });

      if (!existingProduct) throw new Error("Product not found");

      // 2. Slug & Title uniqueness if changed
      if (slug && slug !== existingProduct.slug) {
        const slugExists = await tx.query.products.findFirst({
          where: eq(products.slug, slug),
        });
        if (slugExists) throw new Error("Slug already in use");
      }

      if (title && title !== existingProduct.title) {
        const titleExists = await tx.query.products.findFirst({
          where: eq(products.title, title),
        });
        if (titleExists)
          throw new Error("A product with this title already exists");
      }

      // 3. Update Product
      const [updatedProduct] = await tx
        .update(products)
        .set({
          title,
          slug,
          shortDescription,
          description,
          applications,
          isFeatured,
          thumbnailId: thumbnailId === "" ? null : thumbnailId,
          coverImageId: coverImageId === "" ? null : coverImageId,
          videoId: videoId === "" ? null : videoId,
          isActive,
          order,
          updatedAt: new Date(),
        })
        .where(eq(products.id, id))
        .returning();

      // 4. Update Nested Tables (Delete and Re-insert pattern)
      if (imageIds !== undefined) {
        await tx.delete(productImages).where(eq(productImages.productId, id));
        if (Array.isArray(imageIds) && imageIds.length > 0) {
          await tx.insert(productImages).values(
            imageIds.map((imgId, index) => ({
              productId: id,
              imageId: imgId,
              order: index,
            })),
          );
        }
      }

      if (specs !== undefined) {
        await tx.delete(productSpecs).where(eq(productSpecs.productId, id));
        if (Array.isArray(specs) && specs.length > 0) {
          await tx.insert(productSpecs).values(
            specs.map((spec, index) => ({
              productId: id,
              ...spec,
              order: index,
            })),
          );
        }
      }

      if (benefits !== undefined) {
        await tx
          .delete(productBenefits)
          .where(eq(productBenefits.productId, id));
        if (Array.isArray(benefits) && benefits.length > 0) {
          await tx.insert(productBenefits).values(
            benefits.map((benefit, index) => ({
              productId: id,
              ...benefit,
              order: index,
            })),
          );
        }
      }

      if (faqs !== undefined) {
        await tx.delete(productFaqs).where(eq(productFaqs.productId, id));
        if (Array.isArray(faqs) && faqs.length > 0) {
          await tx.insert(productFaqs).values(
            faqs.map((faq, index) => ({
              productId: id,
              ...faq,
              order: index,
            })),
          );
        }
      }

      // 5. Update media status
      const mediaIdsToAttach = [
        thumbnailId,
        coverImageId,
        videoId,
        ...(imageIds || []),
      ].filter(Boolean) as string[];
      if (mediaIdsToAttach.length > 0) {
        await tx
          .update(media)
          .set({ status: "attached" })
          .where(inArray(media.id, mediaIdsToAttach));
      }

      return updatedProduct;
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("PATCH Product Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: error.message === "Product not found" ? 404 : 400 },
    );
  }
}

/**
 * DELETE /api/products/[id]
 * Admin Only: Delete a product and cleanup
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const { id } = await params;

    let publicIdsToDelete: string[] = [];

    await db.transaction(async (tx) => {
      const product = await tx.query.products.findFirst({
        where: eq(products.id, id),
        with: {
          thumbnail: true,
          coverImage: true,
          video: true,
          images: { with: { image: true } },
        },
      });

      if (!product) throw new Error("Product not found");

      // Gather DB IDs
      const mediaIds = [
        product.thumbnailId,
        product.coverImageId,
        product.videoId,
        ...product.images.map((img) => img.imageId),
      ].filter(Boolean) as string[];

      // Gather Public IDs
      publicIdsToDelete = [
        product.thumbnail?.publicId,
        product.coverImage?.publicId,
        product.video?.publicId,
        ...product.images.map((img) => img.image?.publicId),
      ].filter(Boolean) as string[];

      // 1. Delete media records from DB
      if (mediaIds.length > 0) {
        await tx.delete(media).where(inArray(media.id, mediaIds));
      }

      // 2. Delete product
      await tx.delete(products).where(eq(products.id, id));
    });

    // 3. Cloudinary Cleanup
    if (publicIdsToDelete.length > 0) {
      Promise.allSettled(
        publicIdsToDelete.map((pid) => deleteFromCloudinary(pid)),
      ).catch((err) => console.error("Cloudinary Cleanup Error:", err));
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Product Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: error.message === "Product not found" ? 404 : 500 },
    );
  }
}
