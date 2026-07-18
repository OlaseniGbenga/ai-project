import { NextRequest, NextResponse } from "next/server";

const ONBOARDING_ROUTES = [
  "/onboarding/about-work",
  "/onboarding/comfort-pace",
  "/onboarding/goal-challenge",
  "/onboarding/learning-path",
];


export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const hasAccessToken = request.cookies.get("accessToken")?.value;
    if (!hasAccessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

