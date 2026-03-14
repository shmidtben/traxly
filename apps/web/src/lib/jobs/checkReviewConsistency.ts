// TODO: Connect Redis/BullMQ queue — run after each submission completes

export async function checkReviewConsistency(submissionId: string): Promise<void> {
  // Anomaly detection: flag curators whose scores are statistical outliers.
  // e.g., if 4 curators give emotional_response 7-9 and one gives 2, flag for admin review.

  // TODO:
  // const reviews = await prisma.review.findMany({ where: { submission_id: submissionId } });
  // const scores = reviews.map(r => r.emotional_response);
  // const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  // const stdDev = Math.sqrt(scores.map(s => (s - mean) ** 2).reduce((a, b) => a + b, 0) / scores.length);
  // for (const review of reviews) {
  //   if (Math.abs(review.emotional_response - mean) > 2 * stdDev) {
  //     // Flag for admin review
  //     console.warn(`Review ${review.id} is an outlier (score ${review.emotional_response}, mean ${mean.toFixed(1)})`);
  //   }
  // }

  console.log(`[checkReviewConsistency] Would check consistency for submission ${submissionId}`);
}
