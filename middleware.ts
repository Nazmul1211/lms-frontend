import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rawToken = request.cookies.get("lms_token")?.value;
  const token =
    rawToken &&
    rawToken !== "null" &&
    rawToken !== "undefined" &&
    rawToken.trim().length > 10
      ? rawToken
      : null;
  const role = (request.cookies.get("lms_role")?.value || "student").toLowerCase();

  // If already logged in and visiting login/register, redirect to role dashboard
  if (token && (pathname === "/login" || pathname === "/register")) {
    if (role === "admin") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    if (role === "content_manager") return NextResponse.redirect(new URL("/manager/blogs", request.url));
    if (role === "instructor") return NextResponse.redirect(new URL("/instructor/dashboard", request.url));
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }

  // Define protected route prefixes
  const protectedPrefixes = ["/student", "/instructor", "/manager", "/admin"];
  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  // If visiting protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Enforce role-based boundaries
  if (token && request.cookies.has("lms_role")) {
    const fallback =
      role === "admin"
        ? "/admin/dashboard"
        : role === "instructor"
        ? "/instructor/dashboard"
        : role === "content_manager"
        ? "/manager/blogs"
        : "/student/dashboard";

    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(fallback, request.url));
    }
    if (pathname.startsWith("/manager") && role !== "content_manager" && role !== "admin") {
      return NextResponse.redirect(new URL(fallback, request.url));
    }
    if (pathname.startsWith("/instructor") && role !== "instructor" && role !== "admin") {
      return NextResponse.redirect(new URL(fallback, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/instructor/:path*",
    "/manager/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
