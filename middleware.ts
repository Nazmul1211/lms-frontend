import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("lms_token")?.value;

  // Define protected route prefixes
  const protectedPrefixes = ["/student", "/instructor", "/manager", "/admin"];
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // If visiting protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/instructor/:path*",
    "/manager/:path*",
    "/admin/:path*",
  ],
};
