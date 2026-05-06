import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OlaStudio | Accesorios Premium para tu Ecosistema Apple",
  description: "Catálogo de accesorios premium por OlaLabs. Eleva tu ecosistema Apple con protección y diseño minimalista.",
  keywords: ["accesorios apple", "funda ipad", "magsafe wallet", "puntas apple pencil", "airpods case", "tecnología", "OlaLabs", "OlaStudio"],
  authors: [{ name: "OlaLabs" }],
  openGraph: {
    title: "OlaStudio | Accesorios Premium",
    description: "Catálogo de accesorios premium por OlaLabs.",
    url: "https://olastudio.com",
    siteName: "OlaStudio",
    images: [
      {
        url: "/OlaLabs.png",
        width: 800,
        height: 600,
        alt: "OlaStudio Logo",
      },
    ],
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OlaStudio | Accesorios Premium",
    description: "Descubre accesorios premium para tu ecosistema Apple en OlaStudio.",
    images: ["/OlaLabs.png"],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/OlaLabs.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
