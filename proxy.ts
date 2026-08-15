import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/app", "/studio", "/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = request.cookies.get("ya_session")?.value === "1";
  const home = request.cookies.get("ya_home")?.value || "/";

  const gated = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (gated && !signedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && signedIn) {
    const url = request.nextUrl.clone();
    url.pathname = home.startsWith("/") ? home : "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/app", "/studio/:path*", "/studio", "/admin/:path*", "/admin", "/login"],
};
