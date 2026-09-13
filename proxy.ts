import { NextRequest, NextResponse } from "next/server";

const DASHBOARD_ROUTES = ["/courses", "/certificate", "/settings", "/quiz"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const onboardingCompleted =
    request.cookies.get("onboardingCompleted")?.value === "true";

  const isDashboardRoute = DASHBOARD_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isOnboardingRoute = pathname.startsWith("/onboarding");
  const isVerifyOtpRoute = pathname.startsWith("/verify-otp");

  const isLoggedIn = Boolean(accessToken);

  if ((isDashboardRoute || isOnboardingRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isDashboardRoute && isLoggedIn && !onboardingCompleted) {
    return NextResponse.redirect(
      new URL("/onboarding/about-work", request.url),
    );
  }

  if (isOnboardingRoute && isLoggedIn && onboardingCompleted) {
    return NextResponse.redirect(new URL("/courses", request.url));
  }

  if (isVerifyOtpRoute && isLoggedIn && onboardingCompleted) {
    return NextResponse.redirect(new URL("/courses", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/courses/:path*",
    "/certificate/:path*",
    "/settings/:path*",
    "/quiz/:path*",
    "/onboarding/:path*",
    "/verify-otp",
  ],
};
