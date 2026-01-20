import { NextResponse } from "next/server";
import { db } from "@/db";
import { clients } from "@/db/schema/clients";
import { eq } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";

/**
 * PATCH /api/clients/[id]
 * Admin Only: Update a client
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const body = await request.json();

    const [updatedClient] = await db
      .update(clients)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();

    if (!updatedClient)
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 },
      );

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("PATCH Client Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/clients/[id]
 * Admin Only: Delete a client
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const [deletedClient] = await db
      .delete(clients)
      .where(eq(clients.id, id))
      .returning();

    if (!deletedClient)
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 },
      );

    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("DELETE Client Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
