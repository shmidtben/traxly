export default function SubmissionsAdminPage() {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Admin</div>
      <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 32, letterSpacing: -1, marginBottom: 40 }}>Submissions</h1>
      <p style={{ color: "var(--muted)", fontSize: 13 }}>Connect DATABASE_URL to view submissions.</p>
    </div>
  );
}
