import { NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema/quotes";
import { eq } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";

/**
 * DELETE /api/quotes/[id]
 * Admin Only: Remove a quote
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const { id } = await params;

    const [deletedQuote] = await db
      .delete(quotes)
      .where(eq(quotes.id, id))
      .returning();

    if (!deletedQuote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Quote deleted successfully" });
  } catch (error) {
    console.error("DELETE Quote Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/quotes/[id]
 * Admin Only: Update quote status
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
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 },
      );
    }

    const [updatedQuote] = await db
      .update(quotes)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(quotes.id, id))
      .returning();

    if (!updatedQuote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error("PATCH Quote Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
