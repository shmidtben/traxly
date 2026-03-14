import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ArtistLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  // TODO: Check that user has ARTIST role in DB
  // const user = await prisma.user.findUnique({ where: { clerk_id: userId } });
  // if (!user) redirect("/onboarding/role");
  // if (user.role !== "ARTIST" && user.role !== "ADMIN") redirect("/onboarding/role");

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav style={{ borderBottom: "1px solid var(--border)", padding: "16px 52px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(245,240,232,0.95)", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 20, color: "var(--text)", textDecoration: "none" }}>
          Traxly<span style={{ color: "var(--accent)" }}>.</span>
        </Link>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Link href="/dashboard" style={{ fontSize: 12, color: "var(--muted)", textDecoration: "none", letterSpacing: "0.06em" }}>Dashboard</Link>
          <Link href="/dashboard/submit" style={{ background: "var(--accent)", color: "#fff", padding: "8px 20px", fontSize: 12, textDecoration: "none", fontFamily: "var(--font-dm-mono)", letterSpacing: "0.06em" }}>Submit track</Link>
        </div>
      </nav>
      <main style={{ padding: "48px 52px" }}>{children}</main>
    </div>
  );
}
