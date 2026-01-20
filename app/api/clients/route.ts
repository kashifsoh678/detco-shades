import { NextResponse } from "next/server";
import { db } from "@/db";
import { clients } from "@/db/schema/clients";
import { media } from "@/db/schema/media";
import { eq, desc, count, sql } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";

/**
 * GET /api/clients
 * Public: Fetch paginated list of active clients
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const showAll = searchParams.get("all") === "true";
    const offset = (page - 1) * limit;

    let filter = eq(clients.isActive, true);

    // If 'all' is requested, verify admin
    if (showAll) {
      const auth = await verifyAdmin();
      if (auth.authenticated) {
        filter = sql`true` as any; // Show all
      }
    }

    // 1. Fetch data and total count in parallel (optimized)
    const [data, [totalResult]] = await Promise.all([
      db.query.clients.findMany({
        where: filter,
        with: {
          image: true,
        },
        orderBy: [desc(clients.order), desc(clients.createdAt)],
        limit,
        offset,
      }),
      db.select({ count: count() }).from(clients).where(filter),
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
    console.error("GET Clients Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/clients
 * Admin Only: Create a new client
 */
export async function POST(request: Request) {
  try {
    // 1. Auth Check (Zero Redundancy)
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const { name, imageId } = await request.json();

    if (!name || !imageId) {
      return NextResponse.json(
        { error: "Name and imageId are required" },
        { status: 400 },
      );
    }

    // 2. Transaction: Validate uniqueness and Auto-calculate Order
    const result = await db.transaction(async (tx) => {
      // Check name uniqueness manually for better error message (Case-Insensitive)
      const existing = await tx
        .select()
        .from(clients)
        .where(sql`lower(${clients.name}) = lower(${name})`)
        .limit(1);

      if (existing.length > 0) {
        throw new Error("A client with this name already exists");
      }

      // Calculate next order (Max + 1)
      const maxOrderResult = await tx
        .select({ maxOrder: sql<number>`max(${clients.order})` })
        .from(clients);

      const nextOrder = (maxOrderResult[0]?.maxOrder ?? 0) + 1;

      // Insert Client
      const [newClient] = await tx
        .insert(clients)
        .values({
          name,
          imageId,
          order: nextOrder,
        })
        .returning();

      // Mark Media as 'attached'
      await tx
        .update(media)
        .set({ status: "attached" })
        .where(eq(media.id, imageId));

      return newClient;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("POST Client Error:", error);
    if (error.message === "A client with this name already exists") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
