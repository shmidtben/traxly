// TODO: Connect Redis/BullMQ queue — run this as a cron every hour
// Finds ASSIGNED/IN_PROGRESS assignments past deadline, marks EXPIRED, reassigns

export async function processExpiredAssignments(): Promise<void> {
  // TODO:
  // const expired = await prisma.submissionCuratorAssignment.findMany({
  //   where: {
  //     status: { in: ["ASSIGNED", "IN_PROGRESS"] },
  //     deadline_at: { lt: new Date() },
  //   },
  //   include: { submission: { include: { track: true } } },
  // });
  //
  // for (const assignment of expired) {
  //   await prisma.submissionCuratorAssignment.update({
  //     where: { id: assignment.id },
  //     data: { status: "EXPIRED" },
  //   });
  //   // Reassign to another curator
  //   await assignCuratorsToSubmission(assignment.submission_id);
  // }

  console.log("[processExpiredAssignments] Cron not yet connected to BullMQ");
}
