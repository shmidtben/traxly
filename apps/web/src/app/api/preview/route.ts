import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const COOKIE = "__traxly_preview";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get("token") ?? "";
  const secret = process.env.INTERNAL_PREVIEW_SECRET ?? "";

  if (!secret || token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const nextParam = searchParams.get("next") ?? "/";
  const destination = nextParam.startsWith("/") ? nextParam : "/";

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.redirect(new URL(destination, req.url));
}
