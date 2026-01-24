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
import { eq, desc, count, and, inArray } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";

/**
 * GET /api/products
 * Public: Fetch paginated list of active products
 * Admin: Fetch paginated list of all products if ?all=true
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const showAll = searchParams.get("all") === "true";
    const isFeatured = searchParams.get("isFeatured") === "true";
    const offset = (page - 1) * limit;

    let filters = [];
    if (!showAll) {
      filters.push(eq(products.isActive, true));
    } else {
      const auth = await verifyAdmin();
      if (!auth.authenticated) {
        filters.push(eq(products.isActive, true));
      }
    }

    if (isFeatured) {
      filters.push(eq(products.isFeatured, true));
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const [data, [totalResult]] = await Promise.all([
      db.query.products.findMany({
        where: whereClause,
        with: {
          thumbnail: true,
          coverImage: true,
          video: true,
          images: {
            with: {
              image: true,
            },
            orderBy: [desc(productImages.order)],
          },
          specs: {
            orderBy: [desc(productSpecs.order)],
          },
          benefits: {
            orderBy: [desc(productBenefits.order)],
          },
          faqs: {
            orderBy: [desc(productFaqs.order)],
          },
        },
        orderBy: [desc(products.order), desc(products.createdAt)],
        limit,
        offset,
      }),
      db.select({ count: count() }).from(products).where(whereClause),
    ]);

    const total = totalResult.count;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("GET Products Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/products
 * Admin Only: Create a new product
 */
export async function POST(request: Request) {
  try {
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

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

    if (!title || !slug || !shortDescription || !description || !thumbnailId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await db.transaction(async (tx) => {
      // 1. Uniqueness Checks
      const [existingSlug, existingTitle] = await Promise.all([
        tx.select().from(products).where(eq(products.slug, slug)).limit(1),
        tx.select().from(products).where(eq(products.title, title)).limit(1),
      ]);

      if (existingSlug.length > 0)
        throw new Error("A product with this slug already exists");

      if (existingTitle.length > 0)
        throw new Error("A product with this title already exists");

      // 2. Insert Product
      const [newProduct] = await tx
        .insert(products)
        .values({
          title,
          slug,
          shortDescription,
          description,
          applications: applications || [],
          isFeatured: isFeatured ?? false,
          thumbnailId,
          coverImageId,
          videoId,
          isActive: isActive ?? true,
          order: order ?? 0,
        })
        .returning();

      const productId = newProduct.id;
      const mediaIdsToAttach: string[] = [thumbnailId];
      if (coverImageId) mediaIdsToAttach.push(coverImageId);
      if (videoId) mediaIdsToAttach.push(videoId);

      // 3. Insert Gallery Images
      if (imageIds && Array.isArray(imageIds) && imageIds.length > 0) {
        const imagesToInsert = imageIds.map((id, index) => ({
          productId,
          imageId: id,
          order: index,
        }));
        await tx.insert(productImages).values(imagesToInsert);
        mediaIdsToAttach.push(...imageIds);
      }

      // 4. Insert Specs
      if (specs && Array.isArray(specs) && specs.length > 0) {
        const specsToInsert = specs.map((spec, index) => ({
          productId,
          title: spec.title,
          description: spec.description,
          order: index,
        }));
        await tx.insert(productSpecs).values(specsToInsert);
      }

      // 5. Insert Benefits
      if (benefits && Array.isArray(benefits) && benefits.length > 0) {
        const benefitsToInsert = benefits.map((benefit, index) => ({
          productId,
          title: benefit.title,
          order: index,
        }));
        await tx.insert(productBenefits).values(benefitsToInsert);
      }

      // 6. Insert FAQs
      if (faqs && Array.isArray(faqs) && faqs.length > 0) {
        const faqsToInsert = faqs.map((faq, index) => ({
          productId,
          question: faq.question,
          answer: faq.answer,
          order: index,
        }));
        await tx.insert(productFaqs).values(faqsToInsert);
      }

      // 7. Update media status to 'attached'
      if (mediaIdsToAttach.length > 0) {
        await tx
          .update(media)
          .set({ status: "attached" })
          .where(inArray(media.id, mediaIdsToAttach));
      }

      return newProduct;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("POST Product Error:", error);
    if (error.message === "A product with this slug already exists") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
