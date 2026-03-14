import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// TODO: Uncomment when connected
// import Stripe from "stripe";

type PackName = "starter" | "standard" | "pro";

const PACKS: Record<PackName, { credits: number; price_cents: number; label: string }> = {
  starter:  { credits: 5,  price_cents: parseInt(process.env.CREDIT_PACK_STARTER_CENTS  ?? "2200"), label: "Starter Pack — 5 credits" },
  standard: { credits: 10, price_cents: parseInt(process.env.CREDIT_PACK_STANDARD_CENTS ?? "4000"), label: "Standard Pack — 10 credits" },
  pro:      { credits: 25, price_cents: parseInt(process.env.CREDIT_PACK_PRO_CENTS       ?? "9000"), label: "Pro Pack — 25 credits" },
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { pack } = await req.json() as { pack: PackName };

  if (!pack || !PACKS[pack]) {
    return NextResponse.json({ error: "Invalid pack. Must be starter, standard, or pro." }, { status: 400 });
  }

  const { credits, price_cents, label } = PACKS[pack];

  // TODO: Create Stripe Checkout session for credit pack purchase:
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ["card"],
  //   mode: "payment",
  //   line_items: [{
  //     price_data: {
  //       currency: "usd",
  //       unit_amount: price_cents,
  //       product_data: { name: label },
  //     },
  //     quantity: 1,
  //   }],
  //   metadata: {
  //     clerk_user_id: userId,
  //     pack_name: pack,
  //     credits: String(credits),
  //   },
  //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/credits?success=1`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/credits`,
  // });
  // return NextResponse.json({ checkout_url: session.url });

  return NextResponse.json({
    checkout_url: "TODO: configure Stripe",
    pack,
    credits,
    price_cents,
  });
}
