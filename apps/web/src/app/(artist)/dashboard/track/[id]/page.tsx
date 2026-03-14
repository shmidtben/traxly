import Link from "next/link";

// TODO: Replace with real data fetch
async function getTrack(id: string) {
  return {
    id,
    title: "Untitled_Final_v3.wav",
    genre: "Deep House",
    status: "IN_REVIEW",
    created: "2025-03-01",
    assignments: [
      { id: "a1", status: "SUBMITTED", submitted_at: "2025-03-03" },
      { id: "a2", status: "SUBMITTED", submitted_at: "2025-03-04" },
      { id: "a3", status: "IN_PROGRESS", submitted_at: null },
      { id: "a4", status: "ASSIGNED", submitted_at: null },
      { id: "a5", status: "ASSIGNED", submitted_at: null },
    ],
  };
}

export default async function TrackDetailPage({ params }: { params: { id: string } }) {
  const track = await getTrack(params.id);
  const completed = track.assignments.filter(a => a.status === "SUBMITTED").length;

  const statusColor = (s: string) => s === "SUBMITTED" ? "#2a9d2a" : s === "IN_PROGRESS" ? "var(--accent2)" : "var(--muted)";

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 8 }}>
        <Link href="/dashboard" style={{ fontSize: 11, color: "var(--muted)", textDecoration: "none", letterSpacing: "0.06em" }}>← Dashboard</Link>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>{track.genre}</div>
          <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 32, letterSpacing: -1 }}>{track.title}</h1>
        </div>
        {completed === 5 && (
          <Link href={`/dashboard/track/${track.id}/results`} style={{ background: "var(--accent)", color: "#fff", padding: "12px 24px", textDecoration: "none", fontSize: 12, fontFamily: "var(--font-dm-mono)", letterSpacing: "0.06em" }}>
            View results →
          </Link>
        )}
      </div>

      {/* Progress */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "28px 32px", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Reviews received</span>
          <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 22 }}>{completed} / 5</span>
        </div>
        <div style={{ height: 4, background: "var(--border)" }}>
          <div style={{ height: 4, width: `${(completed / 5) * 100}%`, background: "var(--accent)", transition: "width 0.5s" }} />
        </div>
      </div>

      {/* Assignments */}
      <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Curator assignments</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border)" }}>
        {track.assignments.map((a, i) => (
          <div key={a.id} style={{ background: "var(--bg)", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Curator #{i + 1}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {a.submitted_at && <span style={{ fontSize: 11, color: "var(--muted)" }}>{a.submitted_at}</span>}
              <span style={{ fontSize: 11, color: statusColor(a.status), letterSpacing: "0.06em", textTransform: "uppercase" }}>{a.status.replace(/_/g, " ")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
