// TODO: Connect Redis/BullMQ queue — run every Monday 00:00 UTC

export async function resetWeeklyCounts(): Promise<void> {
  // TODO:
  // await prisma.curatorProfile.updateMany({
  //   data: { current_week_review_count: 0 },
  // });

  console.log("[resetWeeklyCounts] Weekly count reset not yet connected");
}
