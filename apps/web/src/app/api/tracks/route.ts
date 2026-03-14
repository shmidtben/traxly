import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// TODO: Uncomment when DB connected
// import { prisma } from "@traxly/db";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, genre, bpm, key, influences, artist_notes } = await req.json() as {
    title: string;
    genre: string;
    bpm?: number;
    key?: string;
    influences?: string;
    artist_notes?: string;
  };

  if (!title || !genre) {
    return NextResponse.json({ error: "title and genre are required" }, { status: 400 });
  }

  // TODO: Resolve artist profile from clerk userId, then create track:
  // const user = await prisma.user.findUnique({ where: { clerk_id: userId }, include: { artist_profile: true } });
  // if (!user?.artist_profile) return NextResponse.json({ error: "Artist profile not found" }, { status: 404 });
  // const track = await prisma.track.create({
  //   data: { title, genre, bpm, key, influences, artist_notes, audio_file_url: "", artist_id: user.artist_profile.id },
  // });

  const track = { id: "placeholder_track_id", title, genre };
  return NextResponse.json({ track }, { status: 201 });
}
