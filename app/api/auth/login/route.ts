import { NextResponse } from "next/server";
import { encrypt, comparePassword } from "@/lib/auth";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Fetch user from DB
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // Validate user and hash
    const isValid = user && (await comparePassword(password, user.password));

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: "Account is disabled" },
        { status: 403 },
      );
    }

    // Create user object for session (exclude password)
    const userPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // Create session (JWT)
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ user: userPayload, expires });

    // 4. Set Cookie
    const response = NextResponse.json(
      { message: "Login successful", user: userPayload },
      { status: 200 },
    );

    response.cookies.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
