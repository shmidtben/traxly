import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// TODO: import { prisma, PayoutStatus } from "@traxly/db";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // TODO: Fetch pending payouts:
  // const payouts = await prisma.payout.findMany({
  //   where: { status: PayoutStatus.PENDING },
  //   include: { curator: { include: { user: true } }, review: true },
  // });

  return NextResponse.json({ payouts: [] });
}
