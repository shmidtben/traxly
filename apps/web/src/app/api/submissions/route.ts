import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// TODO: Uncomment when connected
// import { prisma, SubmissionStatus, CreditTransactionType } from "@traxly/db";

const TIER_CREDITS: Record<number, number> = {
  1: parseInt(process.env.CURATOR_TIER1_CREDITS ?? "5"),
  2: parseInt(process.env.CURATOR_TIER2_CREDITS ?? "10"),
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { track_id, tier } = await req.json() as { track_id: string; tier: number };

  if (!track_id || !tier) {
    return NextResponse.json({ error: "track_id and tier are required" }, { status: 400 });
  }

  const creditsRequired = TIER_CREDITS[tier] ?? 5;

  // TODO: Deduct credits atomically and create submission:
  // const user = await prisma.user.findUnique({
  //   where: { clerk_id: userId },
  //   include: { artist_profile: true },
  // });
  // if (!user?.artist_profile) return NextResponse.json({ error: "Artist profile not found" }, { status: 404 });
  //
  // if (user.credit_balance < creditsRequired) {
  //   return NextResponse.json({ error: "Insufficient credits", redirect: "/dashboard/credits" }, { status: 402 });
  // }
  //
  // const submission = await prisma.$transaction(async (tx) => {
  //   await tx.user.update({
  //     where: { id: user.id },
  //     data: { credit_balance: { decrement: creditsRequired } },
  //   });
  //
  //   const sub = await tx.submission.create({
  //     data: {
  //       track_id,
  //       artist_id: user.artist_profile!.id,
  //       status: SubmissionStatus.ASSIGNING,
  //       tier,
  //       curator_count: 5,
  //       credits_spent: creditsRequired,
  //       amount_cents: creditsRequired * 500,
  //     },
  //   });
  //
  //   await tx.creditTransaction.create({
  //     data: {
  //       user_id: user.id,
  //       type: CreditTransactionType.SPEND,
  //       credits: -creditsRequired,
  //       description: `Tier ${tier} submission`,
  //       submission_id: sub.id,
  //     },
  //   });
  //
  //   return sub;
  // });
  //
  // return NextResponse.json({ submission_id: submission.id }, { status: 201 });

  return NextResponse.json({
    submission_id: "placeholder_submission_id",
    credits_required: creditsRequired,
  }, { status: 201 });
}
