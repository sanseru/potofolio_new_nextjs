import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (
    !session &&
    (request.nextUrl.pathname.startsWith("/gas") ||
      request.nextUrl.pathname.startsWith("/cars"))
  ) {
    // return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.redirect(new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url));

  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gas/:path*", "/cars/:path*"], // Tambahkan pola untuk /cars
};
