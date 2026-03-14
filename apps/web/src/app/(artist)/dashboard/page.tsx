"use client";

// TODO: Replace mock data with real DB queries
export default function DashboardPage() {
  const tracks = [
    { id: "1", title: "Untitled_Final_v3.wav", genre: "Deep House", status: "IN_REVIEW", reviews: 3, total: 5, created: "2025-03-01" },
    { id: "2", title: "Summer_Drop_master.wav", genre: "Techno", status: "COMPLETED", reviews: 5, total: 5, created: "2025-02-20" },
    { id: "3", title: "Groove_002.wav", genre: "Organic House", status: "PENDING_PAYMENT", reviews: 0, total: 5, created: "2025-03-07" },
  ];

  const statusColors: Record<string, string> = {
    IN_REVIEW: "var(--accent2)",
    COMPLETED: "#2a9d2a",
    PENDING_PAYMENT: "var(--muted)",
    PAID: "var(--accent)",
    ASSIGNING: "var(--accent)",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Artist dashboard</div>
          <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 36, letterSpacing: -1 }}>Your tracks</h1>
        </div>
      </div>

      {tracks.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "60px 40px", textAlign: "center" }}>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>No tracks submitted yet.</p>
          <a href="/dashboard/submit" style={{ background: "var(--accent)", color: "#fff", padding: "12px 28px", fontSize: 12, textDecoration: "none", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.06em" }}>Submit your first track →</a>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border)" }}>
          {tracks.map(track => (
            <a key={track.id} href={`/dashboard/track/${track.id}`} style={{ background: "var(--bg)", padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr auto auto auto", alignItems: "center", gap: 24, textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--bg)")}
            >
              <div>
                <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px", color: "var(--text)", marginBottom: 4 }}>{track.title}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>{track.genre} · Submitted {track.created}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 18, color: "var(--text)" }}>{track.reviews}/{track.total}</div>
                <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}>reviews</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 500, color: statusColors[track.status] ?? "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {track.status.replace(/_/g, " ")}
              </div>
              <div style={{ color: "var(--accent)", fontSize: 12 }}>→</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
