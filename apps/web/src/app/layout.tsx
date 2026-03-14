import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Traxly — Know Your Track Is Ready",
  description:
    "Test unreleased music with verified curators and industry professionals in your genre — before you release it to the world.",
  openGraph: {
    title: "Traxly — Know Your Track Is Ready",
    description:
      "Real feedback from people whose opinions actually matter. Before anyone hears it.",
    url: "https://traxly.live",
    siteName: "Traxly",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
