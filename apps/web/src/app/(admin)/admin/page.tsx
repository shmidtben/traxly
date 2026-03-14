export default function AdminOverviewPage() {
  // TODO: Replace with real DB queries
  const metrics = [
    { label: "Total waitlist", value: "—", sub: "artists + curators" },
    { label: "Pending applications", value: "—", sub: "curators awaiting review" },
    { label: "Active submissions", value: "—", sub: "in review right now" },
    { label: "Pending payouts", value: "—", sub: "awaiting transfer" },
  ];

  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Admin</div>
      <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 32, letterSpacing: -1, marginBottom: 40 }}>Overview</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border)", marginBottom: 48 }}>
        {metrics.map(({ label, value, sub }) => (
          <div key={label} style={{ background: "var(--bg)", padding: "28px 24px" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>{label}</div>
            <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 36, letterSpacing: -1, color: "var(--text)", lineHeight: 1, marginBottom: 6 }}>{value}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{sub}</div>
          </div>
        ))}
      </div>
      <p style={{ color: "var(--muted)", fontSize: 13 }}>Connect DATABASE_URL to populate metrics.</p>
    </div>
  );
}
