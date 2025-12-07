import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";
import { getUserDetail } from "./components/mypage";

const PROTECTED_ROUTES = {
  CONTRIBUTOR: /^\/(contributor|contributors)/,
  MEMBER_ONLY: /^\/(login|mypage)/,
} as const;

export async function middleware(request: NextRequest) {
  const session = await auth();
  const url = new URL(request.url);
  const path = url.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const { data: userInfo } = await getUserDetail();
  const isContributor = (userInfo?.contributor?.status ?? 0) === 3; // 3 = Approved
  const contributorStatus = userInfo?.contributor?.status ?? 0;

  // Check if the path is the index URL, no validation needed
  if (path === "/") {
    return NextResponse.next();
  }

  if (session === null) {
    const loginRedirectPath = isAdminRoute ? "/admin/login" : "/login";
    console.warn("Session is null.");
    return NextResponse.rewrite(new URL(loginRedirectPath, request.url));
  }

  // Prevent logged in admin users from accessing member login routes
  if (PROTECTED_ROUTES.MEMBER_ONLY.test(path) && session.user.isSecretariat) {
    return NextResponse.rewrite(new URL("/admin", request.url));
  }

  // Do not allow normal authenticated users to access admin routes
  if (isAdminRoute && !session.user.isSecretariat) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  // Only allow normal user contributors or author to access contributor routes
  if (PROTECTED_ROUTES.CONTRIBUTOR.test(path) && !isContributor) {
    // If user is contributor and is training
    // 0 - Applying
    // 1 - In training
    // 2 - Waiting for Approval
    // 3 - Approved
    if ([1, 2].indexOf(contributorStatus) > -1 && path.includes("trainings")) {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next({
    headers: {
      "current-url": request.url,
    },
  });
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    "/((?!^/$|api|placeholder|_next/static|_next/image|_next|fonts|favicon.ico|articles|register|password/reissue|password/reset|loginid|about|privacy|terms|about_report|reporter_editor|inquiry|line-inquiry|\\bad\\b|work|information).*)",
  ],
};