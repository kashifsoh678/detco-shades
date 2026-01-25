import { NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema/quotes";
import { services } from "@/db/schema/services";
import { eq, desc } from "drizzle-orm";
import { verifyAdmin } from "@/lib/auth";

/**
 * GET /api/quotes
 * Admin Only: List all quotes
 */
export async function GET(request: Request) {
  try {
    const auth = await verifyAdmin();
    if (!auth.authenticated) return auth.response!;

    const allQuotes = await db.query.quotes.findMany({
      orderBy: [desc(quotes.createdAt)],
      with: {
        service: {
          columns: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(allQuotes);
  } catch (error) {
    console.error("GET Quotes Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/quotes
 * Public: Submit a new quote
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceId, type, companyName, projectDetails } =
      body;

    // 1. Basic Validation
    if (!name || !email || !phone || !serviceId || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 2. Type-specific Validation
    if (type === "contact-cta") {
      if (!companyName || !projectDetails) {
        return NextResponse.json(
          {
            error:
              "Company Name and Project Details are required for detailed quotes",
          },
          { status: 400 },
        );
      }
    }

    // 3. Verify Active Service
    const serviceExists = await db.query.services.findFirst({
      where: eq(services.id, serviceId),
      columns: { id: true },
    });

    if (!serviceExists) {
      return NextResponse.json(
        { error: "Invalid Service ID" },
        { status: 400 },
      );
    }

    // 4. Insert Quote
    const [newQuote] = await db
      .insert(quotes)
      .values({
        name,
        email,
        phone,
        serviceId,
        type,
        companyName: companyName || null,
        projectDetails: projectDetails || null,
        status: "new",
      })
      .returning();

    return NextResponse.json(
      {
        message: "Quote submitted successfully",
        quoteId: newQuote.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Quote Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
