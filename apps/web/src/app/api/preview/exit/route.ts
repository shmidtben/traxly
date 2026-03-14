import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const COOKIE = "__traxly_preview";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
  return NextResponse.redirect(new URL("/", req.url));
}
