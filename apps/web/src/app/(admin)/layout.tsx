import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/login");
  if (!isAdmin(userId)) redirect("/dashboard");

  const navItems = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/applications", label: "Applications" },
    { href: "/admin/submissions", label: "Submissions" },
    { href: "/admin/flags", label: "Flags" },
    { href: "/admin/payouts", label: "Payouts" },
    { href: "/admin/waitlist", label: "Waitlist" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "220px 1fr", background: "var(--bg)" }}>
      <aside style={{ background: "var(--dark)", borderRight: "1px solid var(--dark2)", padding: "32px 0", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "0 24px 32px", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 18, color: "#f5f0e8" }}>
          Traxly<span style={{ color: "var(--accent)" }}>.</span> <span style={{ fontSize: 10, color: "#7a7060", fontWeight: 400 }}>admin</span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} style={{ padding: "10px 24px", fontSize: 12, color: "#7a7060", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.2s" }}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main style={{ padding: "48px 52px" }}>{children}</main>
    </div>
  );
}
