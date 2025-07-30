import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/molecules/Header";
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
  title: "Next.jsのすんごいチャットアプリ",
  description: "Next.jsを使ったすんごいチャットアプリケーション😎",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      data-google-analytics-opt-out=""
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="grid grid-rows-[10%_1fr] h-screen">
          <Header />
          <div className="grid grid-cols-12">
            <div className="col-span-2 max-md:hidden">sidebar</div>
            <div className="col-span-10">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
