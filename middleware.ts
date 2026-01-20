import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("session")?.value;

  // Define protected and public routes
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/admin/dashboard");
  const isLoginPage = request.nextUrl.pathname === "/admin";

  // Decrypt the session if it exists
  let userSession = null;
  if (currentUser) {
    try {
      userSession = await decrypt(currentUser);
    } catch (error) {
      userSession = null;
    }
  }

  // 1. Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !userSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 2. Redirect authenticated users away from the login page
  if (isLoginPage && userSession) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
