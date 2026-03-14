// TODO: Connect Redis/BullMQ queue
// import { Queue } from "bullmq";
// const assignQueue = new Queue("assign-curators", { connection: { url: process.env.REDIS_URL } });

// TODO: import { prisma, ReviewStatus } from "@traxly/db";

/**
 * Called after Stripe payment confirmed.
 * Finds matching curators by genre + capacity, creates assignments, sends emails.
 */
export async function assignCuratorsToSubmission(submissionId: string): Promise<void> {
  // TODO: Implement with real Prisma queries
  // const submission = await prisma.submission.findUnique({
  //   where: { id: submissionId },
  //   include: { track: true },
  // });
  // if (!submission) throw new Error(`Submission ${submissionId} not found`);
  //
  // const genre = submission.track.genre.toLowerCase();
  // const curators = await prisma.curatorProfile.findMany({
  //   where: {
  //     status: "APPROVED",
  //     genres: { hasSome: [genre] },
  //     current_week_review_count: { lt: prisma.curatorProfile.fields.max_weekly_reviews },
  //   },
  //   orderBy: { credibility_score: "desc" },
  //   take: submission.curator_count,
  // });
  //
  // const deadline = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours
  //
  // for (const curator of curators) {
  //   const assignment = await prisma.submissionCuratorAssignment.create({
  //     data: {
  //       submission_id: submissionId,
  //       curator_id: curator.id,
  //       status: ReviewStatus.ASSIGNED,
  //       deadline_at: deadline,
  //     },
  //   });
  //   // TODO: Send email via Resend with review link:
  //   // await sendReviewAssignmentEmail(curator.user.email, assignment.listen_token);
  // }
  //
  // await prisma.submission.update({
  //   where: { id: submissionId },
  //   data: { status: "IN_REVIEW" },
  // });

  console.log(`[assignCuratorsToSubmission] Would assign curators to submission ${submissionId}`);
}
