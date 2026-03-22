import type { Metadata } from "next";
import "./globals.css";
import ReduxStoreProvider from "@/store/provider";

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
    <html lang="ja" data-google-analytics-opt-out="">
      <ReduxStoreProvider>
        <body className="antialiased">{children}</body>
      </ReduxStoreProvider>
    </html>
  );
}
