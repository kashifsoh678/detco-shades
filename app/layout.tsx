import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Detco - Sun Shades & Tensile Structures Saudi Arabia",
  description: "Detco specializes in high-quality sun shades, PVC, HDPE, and tensile structures for car parks, swimming pools, and commercial projects in Saudi Arabia.",
};

import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <TopBar />
        <Navbar />
        <div className="grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
