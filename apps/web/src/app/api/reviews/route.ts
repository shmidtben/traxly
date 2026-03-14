import { NextRequest, NextResponse } from "next/server";
// TODO: import { prisma, ReviewStatus, PlaylistIntent, Readiness } from "@traxly/db";

export async function POST(req: NextRequest) {
  const {
    listen_token,
    emotional_response,
    playlist_intent,
    readiness,
    written_notes,
    timestamps,
  } = await req.json() as {
    listen_token: string;
    emotional_response: number;
    playlist_intent: "YES" | "NO" | "MAYBE";
    readiness: "RELEASE_NOW" | "NEEDS_WORK" | "MAJOR_CHANGES";
    written_notes: string;
    timestamps: { position_seconds: number; question_key: string; note?: string }[];
  };

  if (!listen_token || !emotional_response || !playlist_intent || !readiness || !written_notes) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  if (emotional_response < 1 || emotional_response > 10) {
    return NextResponse.json({ error: "emotional_response must be 1–10" }, { status: 400 });
  }

  // TODO: Validate token, check listen duration >= 80% of track, then create review:
  // const assignment = await prisma.submissionCuratorAssignment.findUnique({
  //   where: { listen_token },
  //   include: { submission: { include: { track: true } } },
  // });
  // if (!assignment) return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  // const minListenSeconds = (assignment.submission.track.duration_seconds ?? 0) * 0.8;
  // if (assignment.listen_duration_seconds < minListenSeconds) {
  //   return NextResponse.json({ error: "Must listen to at least 80% of the track" }, { status: 422 });
  // }
  // const review = await prisma.review.create({
  //   data: {
  //     assignment_id: assignment.id,
  //     curator_id: assignment.curator_id,
  //     submission_id: assignment.submission_id,
  //     emotional_response,
  //     playlist_intent: playlist_intent as PlaylistIntent,
  //     readiness: readiness as Readiness,
  //     written_notes,
  //     timestamps: { create: timestamps },
  //   },
  // });
  // await prisma.submissionCuratorAssignment.update({
  //   where: { id: assignment.id },
  //   data: { status: ReviewStatus.SUBMITTED },
  // });

  return NextResponse.json({ ok: true, review_id: "placeholder_review_id" }, { status: 201 });
}
