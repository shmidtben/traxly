// TODO: Connect Redis/BullMQ queue — run 30 days after track submission

export async function trackOutcomes(submissionId: string): Promise<void> {
  // TODO:
  // const submission = await prisma.submission.findUnique({ where: { id: submissionId }, include: { track: true } });
  // if (!submission) return;
  //
  // if (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) {
  //   const token = await getSpotifyToken();
  //   // Search for track on Spotify, get streams + playlist count
  //   const results = await searchSpotifyTrack(submission.track.title, token);
  //   if (results) {
  //     await prisma.trackOutcome.create({
  //       data: {
  //         track_id: submission.track_id,
  //         submission_id: submissionId,
  //         spotify_streams_30d: results.streams,
  //         spotify_playlist_adds: results.playlistCount,
  //       },
  //     });
  //     await updateCredibilityScores();
  //   }
  // }

  console.log(`[trackOutcomes] Would collect outcomes for submission ${submissionId}`);
}
