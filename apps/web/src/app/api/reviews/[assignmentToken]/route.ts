import { NextRequest, NextResponse } from "next/server";
// TODO: import { prisma } from "@traxly/db";

export async function GET(req: NextRequest, { params }: { params: { assignmentToken: string } }) {
  // Token-based auth — no Clerk required here
  const token = params.assignmentToken;

  // TODO: Resolve assignment by token:
  // const assignment = await prisma.submissionCuratorAssignment.findUnique({
  //   where: { listen_token: token },
  //   include: { submission: { include: { track: true } }, curator: true },
  // });
  // if (!assignment) return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  // if (assignment.status === "EXPIRED") return NextResponse.json({ error: "Assignment expired" }, { status: 410 });
  // if (assignment.status === "SUBMITTED") return NextResponse.json({ error: "Already reviewed" }, { status: 409 });

  return NextResponse.json({
    assignment: {
      id: "placeholder",
      token,
      track: {
        id: "placeholder_track_id",
        title: "Untitled_Final_v3.wav",
        audio_file_url: "TODO: generate presigned R2 URL",
        duration_seconds: 374,
        genre: "Deep House",
        artist_notes: "Focus on the drop and whether the outro feels resolved.",
      },
      deadline_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    },
  });
}

// Heartbeat: update listen_duration_seconds server-side
export async function PATCH(req: NextRequest, { params }: { params: { assignmentToken: string } }) {
  const { listen_duration_seconds } = await req.json() as { listen_duration_seconds: number };
  const token = params.assignmentToken;

  // TODO: Update listen duration:
  // await prisma.submissionCuratorAssignment.update({
  //   where: { listen_token: token },
  //   data: { listen_duration_seconds, status: "IN_PROGRESS" },
  // });

  return NextResponse.json({ ok: true });
}
