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
  title: "Car Parking Shades Manufacturer | DetcoShades",
  description: "DetcoShades is a leading car parking shades manufacturer providing custom UV-resistant shade solutions for commercial and residential projects in Saudi Arabia.",
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
