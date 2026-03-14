"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ArtistOnboardingPage() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [genres, setGenres] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: POST /api/onboarding/artist with { bio, genres, spotifyUrl }
    // then redirect to dashboard
    await new Promise(r => setTimeout(r, 500));
    router.push("/dashboard");
  }

  const inputStyle = { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 16px", fontFamily: "var(--font-dm-mono)", fontSize: 12, outline: "none", width: "100%" } as const;
  const labelStyle = { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--muted)", display: "block", marginBottom: 6 };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 40 }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 28, letterSpacing: -1, marginBottom: 8 }}>
          Set up your artist profile
        </div>
        <p style={{ color: "var(--muted)", marginBottom: 40, fontSize: 13 }}>This helps us match your submissions to the right curators.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={labelStyle}>Bio (optional)</label>
            <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} placeholder="Electronic producer based in..." value={bio} onChange={e => setBio(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Your genres</label>
            <input style={inputStyle} placeholder="deep house, techno, ambient" value={genres} onChange={e => setGenres(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Spotify artist URL (optional)</label>
            <input style={inputStyle} type="url" placeholder="https://open.spotify.com/artist/..." value={spotifyUrl} onChange={e => setSpotifyUrl(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} style={{ background: "var(--accent)", color: "#fff", border: "none", padding: "14px 30px", fontFamily: "var(--font-dm-mono)", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Saving…" : "Go to dashboard →"}
          </button>
        </div>
      </form>
    </div>
  );
}
