import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
// TODO: Uncomment when @traxly/db is connected
// import { prisma, Role } from "@traxly/db";

// Verify Clerk webhook signature using svix
// TODO: npm add svix then uncomment:
// import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const svix_id = headersList.get("svix-id");
  const svix_ts = headersList.get("svix-timestamp");
  const svix_sig = headersList.get("svix-signature");

  if (!svix_id || !svix_ts || !svix_sig) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  // TODO: Verify signature with svix:
  // const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  // const evt = wh.verify(body, { "svix-id": svix_id, "svix-timestamp": svix_ts, "svix-signature": svix_sig });

  const evt = JSON.parse(body) as { type: string; data: { id: string; email_addresses: { email_address: string }[]; first_name?: string; last_name?: string } };

  if (evt.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(" ") || null;

    // TODO: Create user in DB
    // await prisma.user.create({
    //   data: { clerk_id: id, email, name, role: Role.ARTIST },
    // });

    console.log("User created:", { clerk_id: id, email, name });
  }

  return NextResponse.json({ ok: true });
}
