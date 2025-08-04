import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/molecules/Header";
import "../globals.css";
import Sidebar from "@/components/molecules/Sidebar";
import Content from "@/components/molecules/Content";

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
        <main className="grid grid-rows-[8vh_1fr] md:grid-rows-[8vh_1fr] h-screen">
          <Header />
          <div className="grid grid-cols-12">
            <div className="col-span-3 max-md:block bg-surface">
              <Sidebar />
            </div>
            <div className="col-span-9">
              <Content>
                {children}
              </Content>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
