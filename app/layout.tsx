import type { Metadata } from "next";
import "./globals.css";
import { portfolio } from "@/lib/content";

const { person } = portfolio;

export const metadata: Metadata = {
  title: `${person.name} — ${person.title}`,
  description: person.tagline,
  openGraph: {
    title: `${person.name} — ${person.title}`,
    description: person.tagline,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
