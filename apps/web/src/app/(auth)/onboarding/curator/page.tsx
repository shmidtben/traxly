"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CuratorOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [bio, setBio] = useState("");
  const [genres, setGenres] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [applicationWhy, setApplicationWhy] = useState("");
  const [applicationLink, setApplicationLink] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: POST /api/onboarding/curator — creates curator_profile with PENDING status, notifies admin
    await new Promise(r => setTimeout(r, 500));
    setStep(3); // confirmation
  }

  const inputStyle = { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 16px", fontFamily: "var(--font-dm-mono)", fontSize: 12, outline: "none", width: "100%" } as const;
  const labelStyle = { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--muted)", display: "block", marginBottom: 6 };

  if (step === 3) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 40, textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 28, letterSpacing: -1, marginBottom: 12 }}>Application received.</div>
        <p style={{ color: "var(--muted)", maxWidth: 380, lineHeight: 1.8, fontSize: 13 }}>
          We review every curator application manually. You&apos;ll hear from us within 3–5 business days.
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 40 }}>
      <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit} style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Step {step} of 2</div>
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 28, letterSpacing: -1, marginBottom: 8 }}>
          {step === 1 ? "Your curator profile" : "Your application"}
        </div>
        <p style={{ color: "var(--muted)", marginBottom: 40, fontSize: 13 }}>
          {step === 1 ? "Tell us about your taste and background." : "Help us understand why you'd be a great Traxly curator."}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {step === 1 ? (
            <>
              <div><label style={labelStyle}>Bio</label><textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} placeholder="Playlist curator and DJ specialising in..." value={bio} onChange={e => setBio(e.target.value)} /></div>
              <div><label style={labelStyle}>Your genres</label><input style={inputStyle} placeholder="deep house, techno, minimal" value={genres} onChange={e => setGenres(e.target.value)} /></div>
              <div><label style={labelStyle}>Spotify profile or playlist URL</label><input style={inputStyle} type="url" placeholder="https://open.spotify.com/user/..." value={spotifyUrl} onChange={e => setSpotifyUrl(e.target.value)} /></div>
            </>
          ) : (
            <>
              <div><label style={labelStyle}>Why would you be a great Traxly curator?</label><textarea style={{ ...inputStyle, resize: "vertical" }} rows={4} placeholder="I run three playlists and..." value={applicationWhy} onChange={e => setApplicationWhy(e.target.value)} /></div>
              <div><label style={labelStyle}>Link to your work (Spotify, Instagram, blog...)</label><input style={inputStyle} type="url" placeholder="https://..." value={applicationLink} onChange={e => setApplicationLink(e.target.value)} /></div>
            </>
          )}
          <button type="submit" disabled={loading} style={{ background: step === 1 ? "var(--accent)" : "var(--dark)", color: "#fff", border: "none", padding: "14px 30px", fontFamily: "var(--font-dm-mono)", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Submitting…" : step === 1 ? "Next →" : "Submit application →"}
          </button>
        </div>
      </form>
    </div>
  );
}
