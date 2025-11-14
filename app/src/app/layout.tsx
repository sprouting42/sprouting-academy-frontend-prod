import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Prompt } from "next/font/google";
import { Toaster } from "sonner";

import { DarkVeil, Footer, NavigationBar } from "@/components/layout";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  description: "by Sprouting Tech",
  title: "Sprouting Tech Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${prompt.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="min-h-screen overflow-hidden relative">
          <div className="darkveil-container fixed inset-0 pointer-events-none w-full">
            <DarkVeil hueShift={52} />
          </div>
          <div className="relative z-10" style={{ zoom: 0.8 }}>
            <NavigationBar />
            <div className="lg:pt-32 lg:px-8 pt-28 px-4 py-4">{children}</div>
            <Footer />
          </div>
        </div>
        <Toaster position="top-center" expand={true} richColors={false} />
      </body>
    </html>
  );
}
