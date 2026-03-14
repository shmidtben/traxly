"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Assignment {
  id: string;
  token: string;
  track: {
    id: string;
    title: string;
    audio_file_url: string;
    duration_seconds: number;
    genre: string;
    artist_notes: string;
  };
  deadline_at: string;
}

interface Timestamp {
  position_seconds: number;
  question_key: string;
  note: string;
}

export default function ReviewPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [listenSeconds, setListenSeconds] = useState(0);

  const [emotionalResponse, setEmotionalResponse] = useState(5);
  const [playlistIntent, setPlaylistIntent] = useState<"YES" | "NO" | "MAYBE">("MAYBE");
  const [readiness, setReadiness] = useState<"RELEASE_NOW" | "NEEDS_WORK" | "MAJOR_CHANGES">("NEEDS_WORK");
  const [writtenNotes, setWrittenNotes] = useState("");
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const minListenPct = 0.8;
  const listenPct = duration > 0 ? listenSeconds / duration : 0;
  const canSubmit = listenPct >= minListenPct && writtenNotes.length >= 50;

  useEffect(() => {
    fetch(`/api/reviews/${params.token}`)
      .then(r => r.json())
      .then((data: { assignment?: Assignment; error?: string }) => {
        if (data.error) setError(data.error);
        else setAssignment(data.assignment!);
        setLoading(false);
      })
      .catch(() => { setError("Failed to load assignment."); setLoading(false); });
  }, [params.token]);

  // Heartbeat: send listen_duration_seconds every 5s while playing
  const sendHeartbeat = useCallback(async (secs: number) => {
    await fetch(`/api/reviews/${params.token}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listen_duration_seconds: secs }),
    }).catch(() => {});
  }, [params.token]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onDuration = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onDuration);
    return () => { audio.removeEventListener("timeupdate", onTime); audio.removeEventListener("loadedmetadata", onDuration); };
  }, []);

  useEffect(() => {
    if (playing) {
      heartbeatRef.current = setInterval(() => {
        setListenSeconds(s => {
          const next = s + 5;
          sendHeartbeat(next);
          return next;
        });
      }, 5000);
    } else {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    }
    return () => { if (heartbeatRef.current) clearInterval(heartbeatRef.current); };
  }, [playing, sendHeartbeat]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  }

  function markTimestamp(questionKey: string) {
    const position = audioRef.current?.currentTime ?? 0;
    setTimestamps(prev => [...prev, { position_seconds: position, question_key: questionKey, note: "" }]);
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listen_token: params.token,
          emotional_response: emotionalResponse,
          playlist_intent: playlistIntent,
          readiness,
          written_notes: writtenNotes,
          timestamps,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
      setSubmitting(false);
    }
  }

  const inputStyle = { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 16px", fontFamily: "var(--font-dm-mono)", fontSize: 12, outline: "none", width: "100%" } as const;

  if (loading) return <div style={{ padding: 80, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>Loading assignment…</div>;
  if (error) return <div style={{ padding: 80, textAlign: "center", color: "var(--accent)", fontSize: 13 }}>{error}</div>;
  if (submitted) return (
    <div style={{ padding: 80, textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 28, letterSpacing: -1, marginBottom: 12 }}>Review submitted.</div>
      <p style={{ color: "var(--muted)", fontSize: 14 }}>Thank you. Your payout will be processed shortly.</p>
    </div>
  );
  if (!assignment) return null;

  const { track } = assignment;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Curator review</div>
      <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 28, letterSpacing: -1, marginBottom: 4 }}>{track.title}</h1>
      <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", marginBottom: 32 }}>{track.genre}</div>

      {track.artist_notes && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "16px 20px", marginBottom: 32 }}>
          <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Artist notes</div>
          <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.7 }}>{track.artist_notes}</p>
        </div>
      )}

      {/* Audio player */}
      <div style={{ background: "var(--dark)", padding: "28px 32px", marginBottom: 32 }}>
        {track.audio_file_url && !track.audio_file_url.startsWith("TODO") && (
          <audio ref={audioRef} src={track.audio_file_url} />
        )}
        {!track.audio_file_url || track.audio_file_url.startsWith("TODO") ? (
          <p style={{ color: "#7a7060", fontSize: 12, textAlign: "center" }}>Audio player — configure R2 to enable playback</p>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <button onClick={togglePlay} style={{ background: "var(--accent)", color: "#fff", border: "none", width: 40, height: 40, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {playing ? "⏸" : "▶"}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ height: 3, background: "var(--dark2)", cursor: "pointer" }} onClick={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pctX = (e.clientX - rect.left) / rect.width;
                  if (audioRef.current) audioRef.current.currentTime = pctX * duration;
                }}>
                  <div style={{ height: 3, width: duration ? `${(currentTime / duration) * 100}%` : "0%", background: "var(--accent)" }} />
                </div>
              </div>
              <span style={{ fontSize: 11, color: "#7a7060", fontFamily: "var(--font-dm-mono)" }}>{fmt(currentTime)} / {fmt(duration)}</span>
            </div>
          </>
        )}

        {/* Listen progress */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: "#7a7060", letterSpacing: "0.1em" }}>Listen progress</span>
            <span style={{ fontSize: 10, color: listenPct >= minListenPct ? "#4ade80" : "#7a7060" }}>{Math.round(listenPct * 100)}% {listenPct >= minListenPct ? "✓" : `(${Math.round(minListenPct * 100)}% required)`}</span>
          </div>
          <div style={{ height: 2, background: "var(--dark2)" }}>
            <div style={{ height: 2, width: `${Math.min(listenPct * 100, 100)}%`, background: listenPct >= minListenPct ? "#4ade80" : "var(--accent2)", transition: "width 0.5s" }} />
          </div>
        </div>
      </div>

      {/* Timestamp markers */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>Mark timestamps while listening</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["energy_drop", "emotional_peak", "structure_note", "outro_concern"].map(key => (
            <button key={key} onClick={() => markTimestamp(key)} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "6px 14px", fontFamily: "var(--font-dm-mono)", fontSize: 11, cursor: "pointer", letterSpacing: "0.04em", color: "var(--text)" }}>
              + {key.replace(/_/g, " ")} ({fmt(currentTime)})
            </button>
          ))}
        </div>
        {timestamps.length > 0 && (
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            {timestamps.map((ts, i) => (
              <div key={i} style={{ fontSize: 11, color: "var(--muted)", display: "flex", gap: 8 }}>
                <span style={{ color: "var(--accent)" }}>{fmt(ts.position_seconds)}</span>
                <span>{ts.question_key.replace(/_/g, " ")}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review form */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        <div>
          <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--muted)", display: "block", marginBottom: 12 }}>
            Emotional response: <strong style={{ color: "var(--text)" }}>{emotionalResponse} / 10</strong>
          </label>
          <input type="range" min={1} max={10} value={emotionalResponse} onChange={e => setEmotionalResponse(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--muted)", marginTop: 4 }}>
            <span>1 — No connection</span><span>10 — Deeply moved</span>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--muted)", display: "block", marginBottom: 12 }}>
            Would you add it to a playlist?
          </label>
          <div style={{ display: "flex", gap: 1, background: "var(--border)" }}>
            {(["YES", "MAYBE", "NO"] as const).map(opt => (
              <button key={opt} type="button" onClick={() => setPlaylistIntent(opt)} style={{ flex: 1, background: playlistIntent === opt ? "var(--accent2)" : "var(--bg)", color: playlistIntent === opt ? "#fff" : "var(--text)", border: "none", padding: "10px 16px", fontFamily: "var(--font-dm-mono)", fontSize: 12, cursor: "pointer", letterSpacing: "0.06em" }}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--muted)", display: "block", marginBottom: 12 }}>
            Readiness assessment
          </label>
          <div style={{ display: "flex", gap: 1, background: "var(--border)" }}>
            {([["RELEASE_NOW", "Release now"], ["NEEDS_WORK", "Needs work"], ["MAJOR_CHANGES", "Major changes"]] as const).map(([val, label]) => (
              <button key={val} type="button" onClick={() => setReadiness(val)} style={{ flex: 1, background: readiness === val ? "var(--dark)" : "var(--bg)", color: readiness === val ? "#f5f0e8" : "var(--text)", border: "none", padding: "10px 16px", fontFamily: "var(--font-dm-mono)", fontSize: 11, cursor: "pointer", letterSpacing: "0.04em" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--muted)", display: "block", marginBottom: 8 }}>
            Written notes <span style={{ color: writtenNotes.length >= 50 ? "#4ade80" : "var(--muted2)" }}>({writtenNotes.length}/50 min)</span>
          </label>
          <textarea style={{ ...inputStyle, resize: "vertical" }} rows={5} placeholder="Be specific and constructive. What worked, what didn't, where did the energy shift?" value={writtenNotes} onChange={e => setWrittenNotes(e.target.value)} />
        </div>

        {error && <p style={{ color: "var(--accent)", fontSize: 12 }}>{error}</p>}

        <div>
          {!canSubmit && (
            <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12 }}>
              {listenPct < minListenPct ? `Listen to at least ${Math.round(minListenPct * 100)}% of the track before submitting.` : "Write at least 50 characters in your notes."}
            </p>
          )}
          <button onClick={handleSubmit} disabled={!canSubmit || submitting} style={{ background: canSubmit ? "var(--accent)" : "var(--border)", color: canSubmit ? "#fff" : "var(--muted)", border: "none", padding: "14px 30px", fontFamily: "var(--font-dm-mono)", fontSize: 12, fontWeight: 500, cursor: canSubmit ? "pointer" : "not-allowed", letterSpacing: "0.06em", opacity: submitting ? 0.6 : 1 }}>
            {submitting ? "Submitting…" : "Submit review →"}
          </button>
        </div>
      </div>
    </div>
  );
}
