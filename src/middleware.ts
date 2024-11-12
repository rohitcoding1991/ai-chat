import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT, COMMON_ROUTES } from "@/routes";
import { auth } from "./auth";
export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  const isCommonRoute = COMMON_ROUTES.some((route) => {
    const regex = new RegExp(`^${route.replace(/:\w+/g, "[^/]+")}$`);
    return regex.test(nextUrl.pathname);
  });

  if (isAuthenticated) {
    if (isPublicRoute) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    if (isCommonRoute && !nextUrl.pathname.startsWith("/share/")) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
  } else {
    if (!isPublicRoute && !isCommonRoute) {
      return Response.redirect(new URL(ROOT, nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
