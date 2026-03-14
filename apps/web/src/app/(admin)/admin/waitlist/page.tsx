export default function WaitlistAdminPage() {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Admin</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
        <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 32, letterSpacing: -1 }}>Waitlist</h1>
        <a href="/api/admin/waitlist?format=csv" style={{ background: "var(--dark)", color: "#f5f0e8", padding: "10px 20px", textDecoration: "none", fontSize: 11, fontFamily: "var(--font-dm-mono)", letterSpacing: "0.06em" }}>
          Download CSV →
        </a>
      </div>
      <p style={{ color: "var(--muted)", fontSize: 13 }}>Connect DATABASE_URL to view waitlist entries.</p>
    </div>
  );
}
