import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// TODO: import { prisma } from "@traxly/db";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format");

  // TODO: Fetch waitlist entries:
  // const entries = await prisma.waitlistEntry.findMany({ orderBy: { created_at: "asc" } });
  const entries: { type: string; name: string; email: string; created_at: string }[] = [];

  if (format === "csv") {
    const csv = ["type,name,email,genre,link,created_at", ...entries.map((e) => Object.values(e).join(","))].join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="waitlist-${Date.now()}.csv"`,
      },
    });
  }

  return NextResponse.json({ entries });
}
