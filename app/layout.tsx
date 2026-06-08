import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ReelsPro — Share Your Moments",
  description:
    "A modern short-video platform built with Next.js, ImageKit, and MongoDB. Upload, stream and share vertical videos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
