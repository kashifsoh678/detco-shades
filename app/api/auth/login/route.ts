import { NextResponse } from "next/server";
import { encrypt } from "@/lib/auth";
import { API_CONFIG } from "@/constants/api";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // TODO: Replace with Real DB Check
  if (email === "admin@detco.sa" && password === "admin123") {
    const user = {
      id: "1",
      name: "Admin User",
      email,
      role: "admin",
    };

    // Create the session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    const response = NextResponse.json({ user }, { status: 200 });

    response.cookies.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
