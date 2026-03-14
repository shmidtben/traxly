import Link from "next/link";

// TODO: Replace with real aggregated review data
async function getResults(id: string) {
  return {
    track: { id, title: "Untitled_Final_v3.wav", genre: "Deep House", duration_seconds: 374 },
    avg_emotional_response: 7.6,
    playlist_intent: { YES: 4, NO: 0, MAYBE: 1 },
    readiness: { RELEASE_NOW: 3, NEEDS_WORK: 2, MAJOR_CHANGES: 0 },
    timestamps: [
      { position_seconds: 42, question_key: "energy_drop", curator: "Curator #1" },
      { position_seconds: 118, question_key: "emotional_peak", curator: "Curator #2" },
      { position_seconds: 118, question_key: "emotional_peak", curator: "Curator #4" },
      { position_seconds: 280, question_key: "energy_drop", curator: "Curator #3" },
      { position_seconds: 340, question_key: "outro_concern", curator: "Curator #5" },
    ],
    notes: [
      "The drop hits hard but the outro loses energy. Consider extending the breakdown before the final section.",
      "Strong emotional impact at the 2-minute mark. The groove is infectious and playlist-ready.",
      "Could use more variation in the mid-section. The loop feels repetitive around 4 minutes.",
      "Top-tier production. Would add to my deep house playlist immediately.",
      "The outro feels unresolved. Worth adding another 16 bars to give it a proper close.",
    ],
  };
}

export default async function ResultsPage({ params }: { params: { id: string } }) {
  const data = await getResults(params.id);
  const totalReviews = Object.values(data.playlist_intent).reduce((a, b) => a + b, 0);

  function pct(n: number) { return `${Math.round((n / totalReviews) * 100)}%`; }

  const timestampQuestions: Record<string, string> = {
    energy_drop: "Energy drop",
    emotional_peak: "Emotional peak",
    outro_concern: "Outro concern",
    structure_note: "Structure note",
  };

  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ marginBottom: 8 }}>
        <Link href={`/dashboard/track/${data.track.id}`} style={{ fontSize: 11, color: "var(--muted)", textDecoration: "none", letterSpacing: "0.06em" }}>← Track detail</Link>
      </div>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Results</div>
      <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 32, letterSpacing: -1, marginBottom: 40 }}>{data.track.title}</h1>

      {/* Score cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)", marginBottom: 40 }}>
        <div style={{ background: "var(--bg)", padding: "24px 20px" }}>
          <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 12 }}>Avg. Resonance</span>
          <div style={{ height: 3, background: "var(--border)", marginBottom: 8 }}><div style={{ height: 3, width: `${(data.avg_emotional_response / 10) * 100}%`, background: "var(--accent)" }} /></div>
          <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 28, letterSpacing: -1 }}>{data.avg_emotional_response} <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>/ 10</span></div>
        </div>
        <div style={{ background: "var(--bg)", padding: "24px 20px" }}>
          <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 12 }}>Playlist intent</span>
          <div style={{ height: 3, background: "var(--border)", marginBottom: 8 }}><div style={{ height: 3, width: pct(data.playlist_intent.YES), background: "var(--accent2)" }} /></div>
          <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 28, letterSpacing: -1 }}>{pct(data.playlist_intent.YES)} <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>would add</span></div>
        </div>
        <div style={{ background: "var(--bg)", padding: "24px 20px" }}>
          <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 12 }}>Readiness</span>
          <div style={{ height: 3, background: "var(--border)", marginBottom: 8 }}><div style={{ height: 3, width: pct(data.readiness.RELEASE_NOW), background: "#2a9d2a" }} /></div>
          <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 28, letterSpacing: -1 }}>{pct(data.readiness.RELEASE_NOW)} <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>release now</span></div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Timestamp markers</div>
        <div style={{ position: "relative", height: 48, background: "var(--surface)", border: "1px solid var(--border)" }}>
          {data.timestamps.map((ts, i) => {
            const pctPos = (ts.position_seconds / data.track.duration_seconds) * 100;
            return (
              <div key={i} title={`${ts.curator}: ${timestampQuestions[ts.question_key] ?? ts.question_key} @ ${Math.floor(ts.position_seconds / 60)}:${String(ts.position_seconds % 60).padStart(2, "0")}`}
                style={{ position: "absolute", left: `${pctPos}%`, top: 0, bottom: 0, width: 2, background: "var(--accent)", cursor: "pointer" }}>
                <div style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", fontSize: 9, color: "var(--accent)", whiteSpace: "nowrap", marginBottom: 2 }}>
                  {Math.floor(ts.position_seconds / 60)}:{String(ts.position_seconds % 60).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 10, color: "var(--muted)" }}>0:00</span>
          <span style={{ fontSize: 10, color: "var(--muted)" }}>{Math.floor(data.track.duration_seconds / 60)}:{String(data.track.duration_seconds % 60).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Curator notes */}
      <div>
        <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Curator notes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border)" }}>
          {data.notes.map((note, i) => (
            <div key={i} style={{ background: "var(--bg)", padding: "20px 24px" }}>
              <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 8 }}>Curator #{i + 1}</div>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text)" }}>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
