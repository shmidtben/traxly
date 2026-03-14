import { NextRequest, NextResponse } from "next/server";
// TODO: Import prisma once DATABASE_URL is configured
// import { prisma } from "@traxly/db";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { type, name, email, genre, link, why } = body as Record<string, string>;

  if (!type || !name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // ── Loops email capture ────────────────────────────────────────────────────
  const apiKey = process.env.LOOPS_API_KEY;
  if (apiKey) {
    const contact: Record<string, string> = {
      email,
      firstName: name.split(" ")[0],
      source: type === "artist" ? "artist-waitlist" : "curator-application",
      userGroup: type === "artist" ? "artist" : "curator",
    };
    const lastName = name.split(" ").slice(1).join(" ");
    if (lastName) contact.lastName = lastName;
    if (type === "curator") {
      if (genre) contact.genre = genre;
      if (link) contact.curatorLink = link;
      if (why) contact.curatorWhy = why;
    }

    const loopsRes = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(contact),
    });

    if (!loopsRes.ok) {
      const text = await loopsRes.text();
      console.error("Loops API error:", loopsRes.status, text);
      return NextResponse.json({ error: "Failed to save contact" }, { status: 502 });
    }
  }

  // ── Database write ─────────────────────────────────────────────────────────
  // TODO: Connect to database once DATABASE_URL is set
  // await prisma.waitlistEntry.create({
  //   data: { type, name, email, genre: genre ?? null, link: link ?? null, why: why ?? null },
  // });

  return NextResponse.json({ ok: true });
}
