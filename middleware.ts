import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

// simple in-memory rate limiting map
// note: for multi-instance production, consider Redis/Upstash
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

export async function middleware(request: NextRequest) {
  // Use Vercel's ip property if available, otherwise fallback to headers
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",")[0]
    : ((request as any).ip ?? "127.0.0.1");

  const pathname = request.nextUrl.pathname;

  // 1. Rate Limiting for Auth Routes
  if (pathname.startsWith("/api/auth/login")) {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const limit = 20; // 20 requests per window

    const record = rateLimitMap.get(ip) ?? { count: 0, lastRequest: now };

    if (now - record.lastRequest > windowMs) {
      record.count = 1;
      record.lastRequest = now;
    } else {
      record.count++;
    }

    rateLimitMap.set(ip, record);

    if (record.count > limit) {
      return NextResponse.json(
        { message: "Too many login attempts. Please try again later." },
        { status: 429 },
      );
    }
  }

  const currentUser = request.cookies.get("session")?.value;

  // Define protected and public routes
  const isLoginPage = pathname === "/admin";
  const isProtectedRoute = pathname.startsWith("/admin") && !isLoginPage;

  // Decrypt the session if it exists
  let userSession = null;
  if (currentUser) {
    try {
      userSession = await decrypt(currentUser);
    } catch (error) {
      userSession = null;
    }
  }

  // Redirects
  if (isProtectedRoute && !userSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isLoginPage && userSession) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  const response = NextResponse.next();

  // 2. Security Headers
  const securityHeaders = {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // 3. CORS Headers (Allowing same-origin by default, explicit is safer)
  const origin = request.headers.get("origin");
  if (origin && origin.includes(request.nextUrl.host)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};
