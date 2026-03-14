import { NextRequest, NextResponse } from "next/server";
// TODO: import { prisma } from "@traxly/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // TODO: Fetch public curator profile:
  // const profile = await prisma.curatorProfile.findUnique({
  //   where: { id: params.id, status: "APPROVED" },
  //   include: { user: { select: { name: true } } },
  // });
  // if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    curator: {
      id: params.id,
      name: "Sample Curator",
      bio: "Deep house specialist",
      genres: ["deep house", "techno"],
      credibility_score: 0.75,
      total_reviews: 12,
    },
  });
}
