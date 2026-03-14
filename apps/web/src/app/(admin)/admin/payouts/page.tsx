export default function PayoutsAdminPage() {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Admin</div>
      <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 32, letterSpacing: -1, marginBottom: 40 }}>Payouts</h1>
      <p style={{ color: "var(--muted)", fontSize: 13 }}>Connect STRIPE_SECRET_KEY and DATABASE_URL to manage payouts.</p>
    </div>
  );
}
