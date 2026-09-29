import type { Metadata } from "next";
import "./globals.css";
import "./v02.css";
import "./v03.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "SWITCH — платформа взаимного обучения",
  description: "Учитесь, делитесь знаниями и развивайте навыки вместе со SWITCH.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
