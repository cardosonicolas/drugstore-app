import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Cart from "@/components/Cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import { SITE } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Delivery 24 hs en Paraná, Entre Ríos`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "drugstore Paraná",
    "kiosco delivery Paraná",
    "bebidas a domicilio Paraná",
    "snacks Paraná Entre Ríos",
    "drugstore El Paracao",
    "delivery Paraná",
    "kiosco 24 horas Paraná",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Delivery 24 hs en Paraná`,
    description:
      "Bebidas, snacks, chocolates, cigarrillos y despensa a domicilio en Paraná. Pedí por WhatsApp y recibí en tu casa. Atendemos de 9:00 a 04:00.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Delivery en Paraná`,
    description:
      "Bebidas, snacks y despensa a domicilio en Paraná. Pedí por WhatsApp.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#18181b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CartProvider>
          <div className="flex min-h-screen flex-col font-sans">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Cart />
        </CartProvider>
        <StickyWhatsApp />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
