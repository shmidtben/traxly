import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// TODO: import { prisma } from "@traxly/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // TODO: Fetch submission and verify ownership:
  // const submission = await prisma.submission.findUnique({
  //   where: { id: params.id },
  //   include: { track: true, assignments: { include: { review: true } } },
  // });

  return NextResponse.json({ submission: { id: params.id, status: "IN_REVIEW" } });
}
