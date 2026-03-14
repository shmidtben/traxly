import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// TODO: import { prisma, CuratorStatus, Role } from "@traxly/db";

async function requireAdmin(userId: string | null) {
  if (!userId) return false;
  // TODO: Check role in DB:
  // const user = await prisma.user.findUnique({ where: { clerk_id: userId } });
  // return user?.role === Role.ADMIN;
  return true; // placeholder
}

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!await requireAdmin(userId)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // TODO: Fetch pending applications:
  // const applications = await prisma.curatorProfile.findMany({
  //   where: { status: CuratorStatus.PENDING },
  //   include: { user: true },
  //   orderBy: { created_at: "asc" },
  // });

  return NextResponse.json({ applications: [] });
}

export async function PATCH(req: NextRequest) {
  const { userId } = await auth();
  if (!await requireAdmin(userId)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { curator_profile_id, action } = await req.json() as {
    curator_profile_id: string;
    action: "approve" | "reject";
  };

  // TODO: Update curator status and notify:
  // const status = action === "approve" ? CuratorStatus.APPROVED : CuratorStatus.REJECTED;
  // await prisma.curatorProfile.update({ where: { id: curator_profile_id }, data: { status } });
  // Also update user role to CURATOR if approved, send email via Resend

  return NextResponse.json({ ok: true, action, curator_profile_id });
}
