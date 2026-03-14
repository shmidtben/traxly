"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const PACKS = [
  { id: "starter",  name: "Starter",  credits: 5,  price: "$22", desc: "Perfect for trying Traxly" },
  { id: "standard", name: "Standard", credits: 10, price: "$40", desc: "Most popular for active artists" },
  { id: "pro",      name: "Pro",      credits: 25, price: "$90", desc: "Best value for prolific producers" },
] as const;

type PackId = typeof PACKS[number]["id"];

export default function CreditsPage() {
  const searchParams = useSearchParams();
  const purchased = searchParams.get("success") === "1";
  const [loading, setLoading] = useState<PackId | null>(null);
  const [error, setError] = useState("");

  // TODO: Replace with real balance from API
  const creditBalance = 0;

  async function handleBuy(pack: PackId) {
    setLoading(pack);
    setError("");
    try {
      const res = await fetch("/api/credits/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack }),
      });
      const data = await res.json() as { checkout_url: string };

      if (data.checkout_url && !data.checkout_url.startsWith("TODO")) {
        window.location.href = data.checkout_url;
      } else {
        setError("Stripe is not yet configured.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  const inputStyle = { fontFamily: "var(--font-dm-mono)" } as const;

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Credits</div>
      <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 36, letterSpacing: -1, marginBottom: 8 }}>Buy credits</h1>
      <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.8, marginBottom: 40 }}>
        Credits power your submissions. 1 credit = $5 value — packs are priced at a discount.
      </p>

      {purchased && (
        <div style={{ background: "rgba(26,58,232,0.07)", border: "1px solid rgba(26,58,232,0.2)", padding: "14px 20px", marginBottom: 32, fontSize: 13, color: "var(--accent2)" }}>
          Purchase successful — your credits have been added to your balance.
        </div>
      )}

      {/* Current balance */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "20px 24px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.06em" }}>Current balance</span>
        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 28, letterSpacing: -1 }}>
          {creditBalance} <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>credits</span>
        </span>
      </div>

      {/* Packs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border)" }}>
        {PACKS.map(({ id, name, credits, price, desc }) => (
          <div key={id} style={{ background: "var(--bg)", padding: "28px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
            <div>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>{desc}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.04em" }}>{credits} credits &middot; enough for {Math.floor(credits / 5)} Tier 1{credits >= 10 ? ` or ${Math.floor(credits / 10)} Tier 2` : ""} submission{credits / 5 !== 1 ? "s" : ""}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 24, letterSpacing: -0.5, marginBottom: 8 }}>{price}</div>
              <button
                onClick={() => handleBuy(id)}
                disabled={loading !== null}
                style={{ ...inputStyle, background: "var(--accent)", color: "#fff", border: "none", padding: "10px 20px", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em", opacity: loading !== null ? 0.6 : 1, whiteSpace: "nowrap" }}
              >
                {loading === id ? "Loading…" : `Buy ${name} →`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && <p style={{ color: "var(--accent)", fontSize: 12, marginTop: 16 }}>{error}</p>}

      <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 24, lineHeight: 1.7 }}>
        Credits never expire. Unused credits carry over indefinitely. Founding members receive 10 bonus credits on signup.
      </p>
    </div>
  );
}
