import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });

  // Clear the cookie
  response.cookies.set("session", "", {
    expires: new Date(0),
    path: "/",
  });

  return response;
}
