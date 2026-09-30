import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

// Fontes do design system F.Wendler, servidas pelo próprio projeto
const urbanist = localFont({
  src: "./fonts/Urbanist-Variable.woff2",
  weight: "100 900",
  variable: "--font-urbanist",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/DMSans-Variable.woff2",
  weight: "100 1000",
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceMono = localFont({
  src: [
    { path: "./fonts/SpaceMono-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/SpaceMono-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "F.Wendler Support",
  description: "Chatbot de suporte do TimeTrack, o sistema de controle de ponto.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1f1e1d" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: o script de tema muda o data-theme do <html> antes do React carregar
    <html
      lang="pt-BR"
      className={`${urbanist.variable} ${dmSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
