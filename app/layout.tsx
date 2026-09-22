import type { Metadata } from "next";
import "./globals.css";

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
