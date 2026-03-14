import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// TODO: import { prisma } from "@traxly/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // TODO: Fetch track and verify ownership:
  // const track = await prisma.track.findUnique({ where: { id: params.id }, include: { submissions: true } });
  // if (!track) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ track: { id: params.id } });
}
