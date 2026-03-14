"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SubmitTrackPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [influences, setInfluences] = useState("");
  const [artistNotes, setArtistNotes] = useState("");
  const [tier, setTier] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { setError("Please select an audio file."); return; }
    if (!title || !genre) { setError("Title and genre are required."); return; }

    setUploading(true);
    setError("");

    try {
      // 1. Create track record
      const trackRes = await fetch("/api/tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, genre, influences, artist_notes: artistNotes }),
      });
      const { track } = await trackRes.json() as { track: { id: string } };

      // 2. Get presigned upload URL
      const urlRes = await fetch(`/api/tracks/${track.id}/upload-url`);
      const { upload_url } = await urlRes.json() as { upload_url: string };

      // 3. Upload to R2
      setUploadProgress(30);
      if (!upload_url.startsWith("TODO")) {
        await fetch(upload_url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
      }
      setUploadProgress(80);

      // 4. Create submission (credits are deducted server-side)
      const subRes = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track_id: track.id, tier }),
      });
      const subData = await subRes.json() as { submission_id?: string; error?: string; redirect?: string };

      if (!subRes.ok) {
        if (subData.redirect) {
          router.push(subData.redirect);
        } else {
          setError(subData.error ?? "Submission failed.");
          setUploading(false);
        }
        return;
      }

      setUploadProgress(100);
      router.push("/dashboard");
    } catch (err) {
      setError("Upload failed. Please try again.");
      setUploading(false);
    }
  }

  const inputStyle = { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 16px", fontFamily: "var(--font-dm-mono)", fontSize: 12, outline: "none", width: "100%" } as const;
  const labelStyle = { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--muted)", display: "block", marginBottom: 6 };

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>New submission</div>
      <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 36, letterSpacing: -1, marginBottom: 40 }}>Submit a track</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* File upload */}
        <div>
          <label style={labelStyle}>Audio file</label>
          <div
            onClick={() => fileRef.current?.click()}
            style={{ border: `2px dashed ${file ? "var(--accent)" : "var(--border)"}`, padding: "32px 24px", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s" }}
          >
            <input ref={fileRef} type="file" accept="audio/*" style={{ display: "none" }} onChange={e => setFile(e.target.files?.[0] ?? null)} />
            {file ? (
              <span style={{ color: "var(--text)", fontSize: 13 }}>{file.name}</span>
            ) : (
              <span style={{ color: "var(--muted)", fontSize: 13 }}>Click to select audio file (MP3, WAV, FLAC)</span>
            )}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Track title</label>
          <input style={inputStyle} placeholder="Untitled_Final_v3.wav" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Genre</label>
          <input style={inputStyle} placeholder="deep house, techno, ambient..." value={genre} onChange={e => setGenre(e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Key influences (optional)</label>
          <input style={inputStyle} placeholder="Fred again, Jon Hopkins, Four Tet" value={influences} onChange={e => setInfluences(e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Notes for curators (optional)</label>
          <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} placeholder="What are you unsure about? Anything specific you want feedback on?" value={artistNotes} onChange={e => setArtistNotes(e.target.value)} />
        </div>

        {/* Tier selection */}
        <div>
          <label style={labelStyle}>Review tier</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)" }}>
            {[
              { t: 1, name: "Tier 1 — Verified Curators", price: "5 credits", sub: "(~$25 value)", desc: "5 verified playlist curators in your genre" },
              { t: 2, name: "Tier 2 — Industry Pro", price: "10 credits", sub: "(~$50 value)", desc: "5 A&R scouts and industry professionals" },
            ].map(({ t, name, price, sub, desc }) => (
              <button key={t} type="button" onClick={() => setTier(t)} style={{
                background: tier === t ? "var(--accent)" : "var(--bg)",
                color: tier === t ? "#fff" : "var(--text)",
                border: "none",
                padding: "20px 24px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
              }}>
                <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 2 }}>{price}</div>
                <div style={{ fontSize: 11, opacity: 0.65, marginBottom: 4 }}>{sub}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {error && <p style={{ color: "var(--accent)", fontSize: 12 }}>{error}</p>}

        {uploading && (
          <div>
            <div style={{ height: 3, background: "var(--border)" }}>
              <div style={{ height: 3, width: `${uploadProgress}%`, background: "var(--accent)", transition: "width 0.3s" }} />
            </div>
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>Uploading… {uploadProgress}%</p>
          </div>
        )}

        <button type="submit" disabled={uploading} style={{ background: "var(--accent)", color: "#fff", border: "none", padding: "14px 30px", fontFamily: "var(--font-dm-mono)", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em", opacity: uploading ? 0.6 : 1 }}>
          {uploading ? "Processing…" : `Submit (${tier === 1 ? 5 : 10} credits) →`}
        </button>
      </form>
    </div>
  );
}
