// TODO: Replace with real DB fetch
async function getCuratorProfile(id: string) {
  return {
    id,
    name: "Sample Curator",
    bio: "Deep house and techno specialist with 10k+ Spotify followers. Run three playlists covering the best emerging artists in electronic music.",
    genres: ["deep house", "techno", "minimal"],
    credibility_score: 0.75,
    total_reviews: 42,
    spotify_url: "https://open.spotify.com/user/samplecurator",
  };
}

export default async function PublicCuratorPage({ params }: { params: { id: string } }) {
  const curator = await getCuratorProfile(params.id);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "80px 52px" }}>
      <div style={{ maxWidth: 600 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Curator profile</div>
        <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 40, letterSpacing: -1, marginBottom: 8 }}>{curator.name}</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {curator.genres.map(g => (
            <span key={g} style={{ fontSize: 11, padding: "4px 12px", border: "1px solid rgba(232,68,26,0.2)", color: "var(--accent)", background: "rgba(232,68,26,0.05)", letterSpacing: "0.03em" }}>{g}</span>
          ))}
        </div>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>{curator.bio}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)", marginBottom: 24 }}>
          <div style={{ background: "var(--bg)", padding: "20px 24px" }}>
            <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Credibility score</div>
            <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 28, letterSpacing: -1, color: "var(--accent)" }}>{Math.round(curator.credibility_score * 100)}</div>
          </div>
          <div style={{ background: "var(--bg)", padding: "20px 24px" }}>
            <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Reviews completed</div>
            <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 28, letterSpacing: -1 }}>{curator.total_reviews}</div>
          </div>
        </div>
        {curator.spotify_url && (
          <a href={curator.spotify_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--accent2)", letterSpacing: "0.06em" }}>Spotify profile →</a>
        )}
      </div>
    </div>
  );
}
