// TODO: Connect Redis/BullMQ queue

// Fixed payout amounts by submission tier (not a % of submission fee)
const TIER_PAYOUT_CENTS: Record<number, number> = {
  1: parseInt(process.env.CURATOR_TIER1_PAYOUT_CENTS ?? "1500"), // $15
  2: parseInt(process.env.CURATOR_TIER2_PAYOUT_CENTS ?? "3000"), // $30
};

export async function processPayout(reviewId: string): Promise<void> {
  // TODO:
  // const payout = await prisma.payout.findUnique({
  //   where: { review_id: reviewId },
  //   include: { curator: true },
  // });
  // if (!payout || payout.status !== "PENDING") return;
  //
  // const payoutCents = TIER_PAYOUT_CENTS[payout.tier] ?? TIER_PAYOUT_CENTS[1];
  //
  // if (process.env.STRIPE_SECRET_KEY) {
  //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  //   const transfer = await stripe.transfers.create({
  //     amount: payoutCents,
  //     currency: "usd",
  //     destination: payout.curator.stripe_account_id!,
  //   });
  //   await prisma.payout.update({
  //     where: { id: payout.id },
  //     data: { status: "PAID", stripe_transfer_id: transfer.id, amount_cents: payoutCents },
  //   });
  // }

  console.log(`[processPayout] Would process payout for review ${reviewId}`);
}
