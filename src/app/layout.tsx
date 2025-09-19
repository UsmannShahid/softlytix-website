import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "../styles/legacy.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Softlytix | AI-Powered Business Solutions",
  description: "Empowering service businesses with AI-powered automation tools that enhance productivity while preserving the human touch.",
  keywords: "AI business solutions, automation tools, service business, AI chatbots, workflow automation",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Softlytix | AI-Powered Business Solutions",
    description: "Empowering service businesses with AI-powered automation tools that enhance productivity while preserving the human touch.",
    url: "https://www.softlytix.com",
    siteName: "Softlytix",
    images: [
      {
        url: "/softlytix-official-logo.png",
        width: 1200,
        height: 630,
        alt: "Softlytix - AI Business Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Softlytix | AI-Powered Business Solutions",
    description: "Empowering service businesses with AI-powered automation tools",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-body antialiased bg-white text-gray-800 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
