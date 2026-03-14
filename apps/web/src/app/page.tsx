"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const waveformRef = useRef<HTMLDivElement>(null);

  // Nav scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Waveform bars
  useEffect(() => {
    if (!waveformRef.current) return;
    const container = waveformRef.current;
    container.innerHTML = "";
    for (let i = 0; i < 60; i++) {
      const bar = document.createElement("div");
      const isActive = i > 18 && i < 36;
      const isSemi = i >= 36 && i < 46;
      bar.className = "wv-bar" + (isActive ? " active" : isSemi ? " semi" : "");
      const h = Math.random() * 48 + 8;
      bar.style.cssText = `flex:1;background:${isActive ? "var(--accent)" : isSemi ? "var(--accent2)" : "var(--border)"};height:${h}px;opacity:${isSemi ? "0.3" : "1"};animation:wvpulse ${1.2 + Math.random() * 1.8}s ease-in-out ${Math.random() * 2}s infinite;`;
      container.appendChild(bar);
    }
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 52px",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          background: scrolled ? "rgba(245,240,232,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.3s",
        }}
      >
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.5px", color: "var(--text)" }}>
          Traxly<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <ul style={{ display: "flex", gap: 36, listStyle: "none" }}>
          {[["#how", "How it works"], ["#curators-section", "Who reviews"], ["#curator-cta", "For curators"]].map(([href, label]) => (
            <li key={href}>
              <a href={href} style={{ color: "var(--muted)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => scrollTo("artist-cta")}
          style={{ background: "var(--accent)", color: "#fff", border: "none", padding: "10px 24px", fontFamily: "var(--font-dm-mono)", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em" }}
        >
          Join waitlist
        </button>
      </nav>

      {/* Hero */}
      <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "120px 52px 80px", gap: 64, borderBottom: "1px solid var(--border)" }}>
        <div className="animate-fade-up-1">
          <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(48px, 6.5vw, 92px)", lineHeight: 0.95, letterSpacing: "-1.5px", color: "var(--text)" }}>
            Know your<br />
            track is <span style={{ color: "var(--accent)" }}>ready.</span><br />
            <span style={{ display: "block", WebkitTextStroke: "1.5px var(--muted2)", color: "transparent" }}>Before anyone hears it.</span>
          </h1>
          <p style={{ marginTop: 32, fontSize: 14, color: "var(--muted)", maxWidth: 400, lineHeight: 1.85 }}>
            Test unreleased music with <strong style={{ color: "var(--text)", fontWeight: 400 }}>verified curators and industry professionals</strong> in your genre — before you release it to the world. Real feedback from <strong style={{ color: "var(--text)", fontWeight: 400 }}>people whose opinions actually matter.</strong>
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 44, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("artist-cta")} style={{ background: "var(--accent)", color: "#fff", border: "none", padding: "14px 30px", fontFamily: "var(--font-dm-mono)", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em" }}>
              Get early access →
            </button>
            <button onClick={() => scrollTo("curator-cta")} style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)", padding: "14px 30px", fontFamily: "var(--font-dm-mono)", fontSize: 12, cursor: "pointer", letterSpacing: "0.06em" }}>
              Apply as curator
            </button>
          </div>
        </div>

        <div className="animate-fade-up-2">
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>Feedback Report</span>
              <span style={{ fontSize: 10, fontWeight: 500, background: "rgba(232,68,26,0.1)", color: "var(--accent)", padding: "3px 10px", letterSpacing: "0.06em" }}>48hr turnaround</span>
            </div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px", marginBottom: 4 }}>Untitled_Final_v3.wav</div>
              <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>Deep House · 128 BPM · 6:14</div>
            </div>
            <div ref={waveformRef} style={{ display: "flex", alignItems: "center", gap: 3, height: 56, marginBottom: 20 }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {[
                { label: "Emotionally resonant", cls: "hot" },
                { label: "Playlist-ready", cls: "cool" },
                { label: "Strong intro", cls: "" },
                { label: "Drop hits hard", cls: "hot" },
                { label: "Needs outro work", cls: "" },
              ].map(({ label, cls }) => (
                <span key={label} style={{
                  fontSize: 11, padding: "4px 12px", border: `1px solid ${cls === "hot" ? "rgba(232,68,26,0.2)" : cls === "cool" ? "rgba(26,58,232,0.2)" : "var(--border)"}`,
                  color: cls === "hot" ? "var(--accent)" : cls === "cool" ? "var(--accent2)" : "var(--muted)",
                  background: cls === "hot" ? "rgba(232,68,26,0.07)" : cls === "cool" ? "rgba(26,58,232,0.07)" : "transparent",
                  letterSpacing: "0.04em",
                }}>
                  {label}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "Resonance", val: "87 / 100", pct: "87%", blue: false },
                { label: "Curators", val: "8 reviews", pct: "100%", blue: false },
                { label: "Playlist add", val: "92% yes", pct: "92%", blue: true },
              ].map(({ label, val, pct, blue }) => (
                <div key={label} style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border)", padding: "14px 12px" }}>
                  <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8, display: "block" }}>{label}</span>
                  <div style={{ height: 3, background: "var(--border)", width: "100%", marginBottom: 6 }}>
                    <div style={{ height: 3, width: pct, background: blue ? "var(--accent2)" : "var(--accent)" }} />
                  </div>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px", lineHeight: 1 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Problem */}
      <div style={{ background: "var(--dark)", borderTop: "1px solid var(--border)", padding: "100px 52px" }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block" }} />
          The problem
        </div>
        <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(36px, 4.5vw, 60px)", letterSpacing: -2, lineHeight: 1.05, marginBottom: 20, color: "#f5f0e8" }}>
          Finishing a track is the hardest part.
        </h2>
        <p style={{ color: "#7a7060", maxWidth: 480, lineHeight: 1.85, fontSize: 14 }}>
          You&apos;ve listened too many times. Your producer friends say different things. You have no idea if it actually lands.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, marginTop: 64, background: "var(--dark2)" }}>
          {[
            { num: "01", title: "Everyone gives different feedback", body: "Your producer friends hear the mixdown. Your non-musician friends are being polite. Neither tells you if it connects emotionally." },
            { num: "02", title: "You've lost perspective on your own track", body: "After 200 listens you can't hear it anymore. You need fresh ears — specifically ears that live in your genre." },
            { num: "03", title: "Promotion tools don't answer \"is it ready?\"", body: "Existing platforms tell you if a curator will playlist it. They don't tell you if it's finished. That's a completely different question." },
            { num: "04", title: "Nothing fits the creative workflow", body: "Feedback tools feel like PR services. You need something that lives in the studio process — the way Splice does for samples." },
          ].map(({ num, title, body }) => (
            <div key={num} className="reveal" style={{ background: "var(--dark)", padding: "40px 28px", borderTop: "2px solid transparent", transition: "border-color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}
            >
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 44, letterSpacing: -2, color: "var(--dark2)", lineHeight: 1, marginBottom: 18 }}>{num}</div>
              <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 15, color: "#f5f0e8", marginBottom: 10, lineHeight: 1.3, letterSpacing: "-0.3px" }}>{title}</h3>
              <p style={{ color: "#7a7060", fontSize: 12, lineHeight: 1.8 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div id="how" style={{ borderTop: "1px solid var(--border)", padding: "100px 52px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end", marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block" }} />
              How it works
            </div>
            <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(36px, 4.5vw, 60px)", letterSpacing: -2, lineHeight: 1.05 }}>
              Drop it in.<br />Get the signal.
            </h2>
          </div>
          <p style={{ color: "var(--muted)", maxWidth: 480, lineHeight: 1.85, fontSize: 14 }}>
            No submission forms. No waiting weeks. Drop your track in, add context, and get structured feedback from verified people who live in your sound world — within 48 hours.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)" }}>
          {[
            { num: "01", title: "Drop your track", body: "Upload any version — rough mix, final master, anything in between. Add context: genre, key influences, what you're unsure about." },
            { num: "02", title: "We match it to verified ears", body: "Traxly routes your track to manually vetted curators and industry professionals whose specialty matches your sound. No random listeners." },
            { num: "03", title: "Structured feedback, not opinions", body: "Reviewers answer specific questions: Did it make you feel something? Would you add it to a playlist? Where does the energy drop? Timestamped, honest, actionable." },
            { num: "04", title: "Everything, clearly organized", body: "Scores and timestamp markers give you instant orientation — then each curator's written notes give you the depth to act on. No parsing a wall of opinions. Just clear signal and the detail underneath." },
          ].map(({ num, title, body }) => (
            <div key={num} className="reveal" style={{ background: "var(--bg)", padding: "36px 32px", borderBottom: "2px solid transparent", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.borderColor = "var(--accent2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.borderColor = "transparent"; }}
            >
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 48, letterSpacing: -2, color: "var(--border)", lineHeight: 1, marginBottom: 18, transition: "color 0.3s" }}>{num}</div>
              <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 16, marginBottom: 10, letterSpacing: "-0.3px" }}>{title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.85 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Credibility bar */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--dark)", padding: "48px 52px", display: "flex", alignItems: "center" }}>
        {[
          { num: "100%", label: "Manually vetted curators.\nNo one gets in without review." },
          { num: "Genre-\nmatched", label: "Every reviewer is a specialist\nin your specific sound." },
          { num: "Credits\nper review", label: "Artists buy credit packs. Curators\nearn cash — not credits." },
          { num: "Tracked\noutcomes", label: "Curator credibility scores update\nbased on real-world track performance." },
        ].map(({ num, label }, i) => (
          <div key={i} style={{ flex: 1, padding: i === 0 ? "0 40px 0 0" : "0 40px", borderRight: i < 3 ? "1px solid var(--dark2)" : "none" }}>
            <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 40, letterSpacing: -2, color: "var(--accent)", lineHeight: 1, marginBottom: 6, whiteSpace: "pre-line" }}>{num}</div>
            <div style={{ fontSize: 12, color: "#7a7060", lineHeight: 1.5, whiteSpace: "pre-line" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Who reviews */}
      <div id="curators-section" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)", padding: "100px 52px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginBottom: 72 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block" }} />
              Who reviews your music
            </div>
            <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(36px, 4.5vw, 60px)", letterSpacing: -2, lineHeight: 1.05 }}>
              Not random listeners.<br />The right people.
            </h2>
          </div>
          <div>
            <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: 14, marginBottom: 24 }}>
              Every person who reviews your track on Traxly has been manually vetted. They have real audiences, real credibility, and real skin in the game — their reputation score updates based on whether their picks actually perform.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: 14 }}>
              This isn&apos;t crowdsourced feedback. It&apos;s structured input from people whose taste already shapes what gets heard in your genre.
            </p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)" }}>
          {/* Tier 1 */}
          <div className="reveal" style={{ background: "var(--bg)", padding: "44px 36px", transition: "background 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--bg)")}
          >
            <div style={{ width: 10, height: 10, background: "var(--accent)", marginBottom: 28 }} />
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>Tier 01</div>
            <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.5px", marginBottom: 14 }}>Verified Curators</div>
            <div style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.85, marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid var(--border)" }}>
              Playlist curators, music bloggers, and tastemakers with demonstrated audiences and a track record of discovery. Application-only. Every curator is reviewed manually before joining.
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 10 }}>Who they are</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Playlist curators", "Music bloggers", "DJ selectors", "Tastemaker accounts"].map(t => (
                  <span key={t} style={{ fontSize: 11, padding: "4px 12px", border: "1px solid rgba(232,68,26,0.2)", color: "var(--accent)", background: "rgba(232,68,26,0.05)", letterSpacing: "0.03em" }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20, marginBottom: 4, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 22 }}>5 credits</span>
              <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 8 }}>per submission (~$25)</span>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {["Manually vetted before joining", "Genre specialist matching", "Timestamped structured feedback", "Credibility score tracked over time", "Paid per quality review"].map(f => (
                <li key={f} style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "flex-start", gap: 10, lineHeight: 1.5 }}>
                  <span style={{ color: "var(--accent)", fontSize: 11, flexShrink: 0, marginTop: 1 }}>→</span>{f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tier 2 */}
          <div className="reveal" style={{ background: "var(--dark)", padding: "44px 36px", position: "relative", transition: "background 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--dark2)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--dark)")}
          >
            <span style={{ position: "absolute", top: 24, right: 24, fontSize: 9, fontWeight: 500, letterSpacing: "0.15em", background: "var(--accent2)", color: "#fff", padding: "4px 10px" }}>INVITE ONLY</span>
            <div style={{ width: 10, height: 10, background: "var(--accent2)", marginBottom: 28 }} />
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a7060", marginBottom: 8 }}>Tier 02</div>
            <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.5px", marginBottom: 14, color: "#f5f0e8" }}>Industry Professionals</div>
            <div style={{ color: "#7a7060", fontSize: 12, lineHeight: 1.85, marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid var(--dark2)" }}>
              A&R scouts, sync supervisors, established DJs, and label representatives. Invite-only. For artists who need to know if a track is ready for the next level — not just a playlist.
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--dark3)", marginBottom: 10 }}>Who they are</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["A&R scouts", "Sync supervisors", "Label reps", "Established DJs"].map(t => (
                  <span key={t} style={{ fontSize: 11, padding: "4px 12px", border: "1px solid rgba(26,58,232,0.2)", color: "#6a7af0", background: "rgba(26,58,232,0.06)", letterSpacing: "0.03em" }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20, marginBottom: 4, paddingTop: 20, borderTop: "1px solid var(--dark2)" }}>
              <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 22, color: "#f5f0e8" }}>10 credits</span>
              <span style={{ fontSize: 12, color: "#7a7060", marginLeft: 8 }}>per submission (~$50)</span>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {["Invite-only, strictly limited", "Signing & sync potential signal", "Detailed written notes", "Direct industry connection", "Premium submission tier"].map(f => (
                <li key={f} style={{ fontSize: 12, color: "#7a7060", display: "flex", alignItems: "flex-start", gap: 10, lineHeight: 1.5 }}>
                  <span style={{ color: "#6a7af0", fontSize: 11, flexShrink: 0, marginTop: 1 }}>→</span>{f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Credit Packs */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "100px 52px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end", marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 20, height: 1, background: "var(--accent)", display: "inline-block" }} />
              Pricing
            </div>
            <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(36px, 4.5vw, 60px)", letterSpacing: -2, lineHeight: 1.05 }}>
              Buy credits.<br />Use when ready.
            </h2>
          </div>
          <p style={{ color: "var(--muted)", maxWidth: 480, lineHeight: 1.85, fontSize: 14 }}>
            Credits never expire. Buy a pack, submit tracks whenever you&apos;re ready. Founding members get 10 free credits — enough for two Tier 1 submissions.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }}>
          {[
            { name: "Starter", credits: 5,  price: "$22", note: "2 Tier 1 submissions",  highlight: false },
            { name: "Standard", credits: 10, price: "$40", note: "2 Tier 1 or 1 Tier 2", highlight: true },
            { name: "Pro",      credits: 25, price: "$90", note: "5 Tier 1 submissions",  highlight: false },
          ].map(({ name, credits, price, note, highlight }) => (
            <div key={name} className="reveal" style={{ background: highlight ? "var(--dark)" : "var(--bg)", padding: "44px 36px", transition: "background 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.background = highlight ? "var(--dark2)" : "var(--surface)")}
              onMouseLeave={e => (e.currentTarget.style.background = highlight ? "var(--dark)" : "var(--bg)")}
            >
              {highlight && (
                <span style={{ display: "inline-block", fontSize: 9, fontWeight: 500, letterSpacing: "0.15em", background: "var(--accent)", color: "#fff", padding: "4px 10px", marginBottom: 20 }}>MOST POPULAR</span>
              )}
              {!highlight && <div style={{ height: 30, marginBottom: 20 }} />}
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px", marginBottom: 4, color: highlight ? "#f5f0e8" : "var(--text)" }}>{name}</div>
              <div style={{ fontSize: 11, color: highlight ? "#7a7060" : "var(--muted)", marginBottom: 24 }}>{credits} credits &middot; {note}</div>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 40, letterSpacing: -2, color: highlight ? "#f5f0e8" : "var(--text)", lineHeight: 1, marginBottom: 6 }}>{price}</div>
              <div style={{ fontSize: 11, color: highlight ? "#7a7060" : "var(--muted)" }}>${(parseInt(price.slice(1)) / credits).toFixed(2)} per credit</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dual CTA */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)" }}>
          {/* Artist */}
          <div id="artist-cta" style={{ padding: "80px 64px", background: "var(--bg)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
              <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block" }} />
              For artists
            </div>
            <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(32px, 3vw, 50px)", letterSpacing: -2, lineHeight: 1.05, marginBottom: 16 }}>
              Stop guessing.<br />Start knowing.
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.85, marginBottom: 36, maxWidth: 340 }}>
              Join the waitlist and be first to test your unreleased music with verified curators. Founding members get <strong>10 free credits</strong> — enough for two submissions.
            </p>
            <ArtistForm />
          </div>

          {/* Curator */}
          <div id="curator-cta" style={{ padding: "80px 64px", background: "var(--dark)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent2)", marginBottom: 20 }}>
              <span style={{ width: 20, height: 1, background: "var(--accent2)", display: "block" }} />
              For curators
            </div>
            <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(32px, 3vw, 50px)", letterSpacing: -2, lineHeight: 1.05, marginBottom: 16, color: "#f5f0e8" }}>
              Get paid to<br />trust your ears.
            </h2>
            <p style={{ color: "#7a7060", fontSize: 13, lineHeight: 1.85, marginBottom: 36, maxWidth: 340 }}>
              Apply to become a verified Traxly curator. Hear music before anyone else — and get paid per structured review in your genre.
            </p>
            <CuratorForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 52px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
          Traxly<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <p style={{ fontSize: 11, color: "var(--muted2)", letterSpacing: "0.06em" }}>© 2025 Traxly — Know your track is ready.</p>
      </footer>
    </>
  );
}

// ─── Inline form components ──────────────────────────────────────────────────

function ArtistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit() {
    if (!name) { setStatus("error"); setMsg("Please enter your name."); return; }
    if (!email || !email.includes("@")) { setStatus("error"); setMsg("Please enter a valid email."); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "artist", name, email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setMsg(`Thanks ${name}! We'll be in touch when Traxly launches.`);
      setName(""); setEmail("");
    } catch {
      setStatus("error");
      setMsg("Something went wrong. Please try again.");
    }
  }

  const inputStyle = { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 16px", fontFamily: "var(--font-dm-mono)", fontSize: 12, outline: "none", width: "100%" } as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>
      <input style={inputStyle} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
      <input style={inputStyle} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handleSubmit} disabled={status === "loading"} style={{ background: "var(--accent)", color: "#fff", border: "none", padding: "14px 30px", fontFamily: "var(--font-dm-mono)", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em", opacity: status === "loading" ? 0.6 : 1 }}>
        {status === "loading" ? "Sending…" : status === "success" ? "You're on the list ✓" : "Join artist waitlist →"}
      </button>
      {msg && <p style={{ fontSize: 12, color: status === "success" ? "#2a9d2a" : "var(--accent)" }}>{msg}</p>}
      <p style={{ fontSize: 10, color: "var(--muted2)", letterSpacing: "0.06em" }}>No spam. Early access only.</p>
    </div>
  );
}

function CuratorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState("");
  const [link, setLink] = useState("");
  const [why, setWhy] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit() {
    if (!name) { setStatus("error"); setMsg("Please enter your name."); return; }
    if (!email || !email.includes("@")) { setStatus("error"); setMsg("Please enter a valid email."); return; }
    if (!genre) { setStatus("error"); setMsg("Please enter your genre specialty."); return; }
    if (!link) { setStatus("error"); setMsg("Please include a playlist or social link."); return; }
    if (!why) { setStatus("error"); setMsg("Please tell us why you'd be a great curator."); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "curator", name, email, genre, link, why }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setMsg(`Thanks ${name}! We review manually and will be in touch soon.`);
      setName(""); setEmail(""); setGenre(""); setLink(""); setWhy("");
    } catch {
      setStatus("error");
      setMsg("Something went wrong. Please try again.");
    }
  }

  const inputStyle = { background: "var(--dark2)", border: "1px solid var(--dark3)", color: "#f5f0e8", padding: "12px 16px", fontFamily: "var(--font-dm-mono)", fontSize: 12, outline: "none", width: "100%" } as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>
      <input style={inputStyle} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
      <input style={inputStyle} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="Your genre (e.g. deep house, dubstep)" value={genre} onChange={e => setGenre(e.target.value)} />
      <input style={inputStyle} placeholder="Playlist or social link (Spotify, Instagram, etc.)" value={link} onChange={e => setLink(e.target.value)} />
      <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} placeholder="Why would you be a great Traxly curator? (2–3 sentences)" value={why} onChange={e => setWhy(e.target.value)} />
      <button onClick={handleSubmit} disabled={status === "loading"} style={{ background: "var(--accent2)", color: "#fff", border: "none", padding: "14px 30px", fontFamily: "var(--font-dm-mono)", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em", opacity: status === "loading" ? 0.6 : 1 }}>
        {status === "loading" ? "Sending…" : status === "success" ? "Application received ✓" : "Apply as curator →"}
      </button>
      {msg && <p style={{ fontSize: 12, color: status === "success" ? "#4ade80" : "#f87171" }}>{msg}</p>}
      <p style={{ fontSize: 10, color: "var(--dark3)", letterSpacing: "0.06em" }}>Reviewed manually. Quality over volume.</p>
    </div>
  );
}
