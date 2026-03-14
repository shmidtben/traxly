"use client";

import { useState } from "react";

// TODO: Replace with real API fetch
const mockApplications = [
  { id: "1", name: "Alex Kim", email: "alex@example.com", genre: "Techno", link: "https://open.spotify.com/user/alex", why: "I run two techno playlists with 8k followers.", applied: "2025-03-05" },
  { id: "2", name: "Sam Rivers", email: "sam@example.com", genre: "R&B / Neo-soul", link: "https://instagram.com/samrivers", why: "Music blogger with 5 years covering emerging R&B artists.", applied: "2025-03-06" },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications);
  const [processing, setProcessing] = useState<string | null>(null);

  async function handleAction(id: string, action: "approve" | "reject") {
    setProcessing(id);
    await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ curator_profile_id: id, action }),
    });
    setApplications(prev => prev.filter(a => a.id !== id));
    setProcessing(null);
  }

  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Admin</div>
      <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 32, letterSpacing: -1, marginBottom: 40 }}>Curator applications</h1>
      {applications.length === 0 ? (
        <p style={{ color: "var(--muted)", fontSize: 13 }}>No pending applications.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border)" }}>
          {applications.map(app => (
            <div key={app.id} style={{ background: "var(--bg)", padding: "28px 32px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{app.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12 }}>{app.email} · {app.genre} · Applied {app.applied}</div>
                  <a href={app.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "var(--accent2)", display: "block", marginBottom: 12 }}>{app.link}</a>
                  <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.7 }}>{app.why}</p>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button onClick={() => handleAction(app.id, "reject")} disabled={processing === app.id} style={{ padding: "8px 18px", border: "1px solid var(--border)", background: "transparent", fontFamily: "var(--font-dm-mono)", fontSize: 11, cursor: "pointer", color: "var(--muted)" }}>
                    Reject
                  </button>
                  <button onClick={() => handleAction(app.id, "approve")} disabled={processing === app.id} style={{ padding: "8px 18px", background: "var(--accent)", border: "none", fontFamily: "var(--font-dm-mono)", fontSize: 11, cursor: "pointer", color: "#fff" }}>
                    {processing === app.id ? "…" : "Approve"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
