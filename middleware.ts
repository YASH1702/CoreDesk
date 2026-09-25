import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "coredesk-super-secret-jwt-key-2026" });
  const { pathname } = req.nextUrl;

  // Protect Admin Dashboard routes
  if (pathname.startsWith("/dashboard/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(pathname), req.url));
    }
    if (token.role !== "BUSINESS_OWNER" && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/customer", req.url));
    }
  }

  // Protect Staff Dashboard routes
  if (pathname.startsWith("/dashboard/staff")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(pathname), req.url));
    }
    if (token.role !== "STAFF" && token.role !== "BUSINESS_OWNER" && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/customer", req.url));
    }
  }

  // Protect Customer Dashboard routes
  if (pathname.startsWith("/dashboard/customer")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(pathname), req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
