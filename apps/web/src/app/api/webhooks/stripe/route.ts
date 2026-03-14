import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
// TODO: Uncomment when Stripe is connected
// import Stripe from "stripe";
// import { prisma, CreditTransactionType } from "@traxly/db";
// import { assignCuratorsToSubmission } from "@/lib/jobs/assignCuratorsToSubmission";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  // TODO: Verify and construct event:
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

  const event = JSON.parse(body) as {
    type: string;
    data: {
      object: {
        id: string;
        payment_intent: string;
        metadata: {
          clerk_user_id?: string;
          pack_name?: string;
          credits?: string;
        };
      };
    };
  };

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { clerk_user_id, pack_name, credits } = session.metadata ?? {};

    if (clerk_user_id && credits) {
      const creditsToAdd = parseInt(credits);

      // TODO: Increment user credit balance and record transaction:
      // const user = await prisma.user.findUnique({ where: { clerk_id: clerk_user_id } });
      // if (user) {
      //   await prisma.$transaction([
      //     prisma.user.update({
      //       where: { id: user.id },
      //       data: { credit_balance: { increment: creditsToAdd } },
      //     }),
      //     prisma.creditTransaction.create({
      //       data: {
      //         user_id: user.id,
      //         type: CreditTransactionType.PURCHASE,
      //         credits: creditsToAdd,
      //         description: `Purchased ${pack_name ?? "credit"} pack (${creditsToAdd} credits)`,
      //       },
      //     }),
      //   ]);
      // }

      console.log(`Credit pack purchased: ${pack_name} (+${creditsToAdd} credits) for user ${clerk_user_id}`);
    }
  }

  return NextResponse.json({ received: true });
}
