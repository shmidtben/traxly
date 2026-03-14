// Curator review routes use token-based auth, not Clerk
// The [token] page handles its own validation via the listen_token
export default function CuratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav style={{ borderBottom: "1px solid var(--border)", padding: "16px 52px", background: "rgba(245,240,232,0.95)" }}>
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 20, color: "var(--text)" }}>
          Traxly<span style={{ color: "var(--accent)" }}>.</span>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
