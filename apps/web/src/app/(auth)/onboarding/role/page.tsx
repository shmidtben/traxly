"use client";

import { useRouter } from "next/navigation";

export default function RoleSelectPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 40 }}>
      <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 32, letterSpacing: -1, marginBottom: 12 }}>
        Welcome to Traxly<span style={{ color: "var(--accent)" }}>.</span>
      </div>
      <p style={{ color: "var(--muted)", marginBottom: 48, fontSize: 14 }}>How will you use Traxly?</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)", width: "100%", maxWidth: 640 }}>
        <button
          onClick={() => router.push("/onboarding/artist")}
          style={{ background: "var(--bg)", padding: "48px 40px", border: "none", cursor: "pointer", textAlign: "left", borderBottom: "2px solid transparent", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.borderColor = "transparent"; }}
        >
          <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 22, letterSpacing: -0.5, marginBottom: 8 }}>I&apos;m an Artist</div>
          <p style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.7 }}>I want to get structured feedback on my unreleased tracks.</p>
        </button>
        <button
          onClick={() => router.push("/onboarding/curator")}
          style={{ background: "var(--dark)", padding: "48px 40px", border: "none", cursor: "pointer", textAlign: "left", borderBottom: "2px solid transparent", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--dark2)"; e.currentTarget.style.borderColor = "var(--accent2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--dark)"; e.currentTarget.style.borderColor = "transparent"; }}
        >
          <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 22, letterSpacing: -0.5, marginBottom: 8, color: "#f5f0e8" }}>I&apos;m a Curator</div>
          <p style={{ color: "#7a7060", fontSize: 12, lineHeight: 1.7 }}>I want to review tracks and get paid for quality feedback.</p>
        </button>
      </div>
    </div>
  );
}
