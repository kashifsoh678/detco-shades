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
    const offset = (page - 1) * limit;

    // 1. Fetch data and total count in parallel (optimized)
    const [data, [totalResult]] = await Promise.all([
      db.query.clients.findMany({
        where: eq(clients.isActive, true),
        with: {
          image: true,
        },
        orderBy: [desc(clients.order), desc(clients.createdAt)],
        limit,
        offset,
      }),
      db
        .select({ count: count() })
        .from(clients)
        .where(eq(clients.isActive, true)),
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
      { message: "Internal server error" },
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

    const { name, imageId, order } = await request.json();

    if (!name || !imageId) {
      return NextResponse.json(
        { message: "Name and imageId are required" },
        { status: 400 },
      );
    }

    // 1. Transaction: Create Client and Mark Media as 'attached'
    const result = await db.transaction(async (tx) => {
      const [newClient] = await tx
        .insert(clients)
        .values({
          name,
          imageId,
          order: order || 0,
        })
        .returning();

      await tx
        .update(media)
        .set({ status: "attached" })
        .where(eq(media.id, imageId));

      return newClient;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST Client Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
