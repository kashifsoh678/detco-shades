import { NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema/services";
import { media } from "@/db/schema/media";
import { eq, desc, count, sql } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";

/**
 * GET /api/services
 * Public: Fetch paginated list of active services
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const showAll = searchParams.get("all") === "true";
    const offset = (page - 1) * limit;

    let filter = eq(services.isActive, true);

    // If 'all' is requested, verify admin
    if (showAll) {
      const auth = await verifyAdmin();
      if (auth.authenticated) {
        filter = sql`true` as any;
      }
    }

    const [data, [totalResult]] = await Promise.all([
      db.query.services.findMany({
        where: filter,
        with: {
          coverImage: true,
        },
        orderBy: [desc(services.order), desc(services.createdAt)],
        limit,
        offset,
      }),
      db.select({ count: count() }).from(services).where(filter),
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
    console.error("GET Services Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/services
 * Admin Only: Create a new service
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
      details,
      iconName,
      coverImageId,
      features,
      processSteps,
    } = body;

    if (!title || !slug || !shortDescription || !details || !iconName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await db.transaction(async (tx) => {
      // 1. Uniqueness Checks (Case-Insensitive for title)
      const existingTitle = await tx
        .select()
        .from(services)
        .where(sql`lower(${services.title}) = lower(${title})`)
        .limit(1);

      if (existingTitle.length > 0)
        throw new Error("A service with this title already exists");

      const existingSlug = await tx
        .select()
        .from(services)
        .where(eq(services.slug, slug))
        .limit(1);

      if (existingSlug.length > 0)
        throw new Error("A service with this slug already exists");

      // 2. Auto-calculate Order
      const maxOrderResult = await tx
        .select({ maxOrder: sql<number>`max(${services.order})` })
        .from(services);

      const nextOrder = (maxOrderResult[0]?.maxOrder ?? 0) + 1;

      // 3. Insert Service
      const [newService] = await tx
        .insert(services)
        .values({
          title,
          slug,
          shortDescription,
          details,
          iconName,
          coverImageId,
          features: features || [],
          processSteps: processSteps || [],
          order: nextOrder,
        })
        .returning();

      // 4. Mark Cover Image as 'attached'
      if (coverImageId) {
        await tx
          .update(media)
          .set({ status: "attached" })
          .where(eq(media.id, coverImageId));
      }

      return newService;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("POST Service Error:", error);
    const knownErrors = [
      "A service with this title already exists",
      "A service with this slug already exists",
    ];
    if (knownErrors.includes(error.message)) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
