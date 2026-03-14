import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isAdmin } from "./lib/auth";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/curator/review(.*)",
  "/admin(.*)",
  "/onboarding(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isAdminRoute(req)) {
    if (!isAdmin(userId)) return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
