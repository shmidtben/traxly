// TODO: Connect Redis/BullMQ queue — run after track outcome data is collected

export async function updateCredibilityScores(): Promise<void> {
  // Algorithm: for each curator, look at their reviews where track_outcomes exist.
  // If curator predicted YES playlist intent and track got added to playlists → score up.
  // If curator predicted RELEASE_NOW and track performed well → score up.
  // Decay toward 0.5 for inactive curators.

  // TODO:
  // const outcomes = await prisma.trackOutcome.findMany({ include: { submission: { include: { reviews: true } } } });
  // for (const outcome of outcomes) {
  //   for (const review of outcome.submission.reviews) {
  //     const delta = computeCredibilityDelta(review, outcome);
  //     await prisma.curatorProfile.update({
  //       where: { id: review.curator_id },
  //       data: { credibility_score: { increment: delta } },
  //     });
  //   }
  // }

  console.log("[updateCredibilityScores] Not yet connected");
}
