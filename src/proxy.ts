import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(
    `[WebProfileUniversalLinkDebug] profile_request_received path=${pathname}`,
  );

  if (pathname.length > "/profile/".length && pathname.endsWith("/")) {
    const normalizedPath = pathname.replace(/\/+$/, "");
    console.log(
      `[WebProfileUniversalLinkDebug] profile_redirect_detected from=${pathname} to=${normalizedPath}`,
    );

    const normalizedURL = request.nextUrl.clone();
    normalizedURL.pathname = normalizedPath;
    return NextResponse.rewrite(normalizedURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};
