import type { Metadata } from "next";
import Header from "@/components/molecules/Header";
import "../globals.css";
import Sidebar from "@/components/molecules/Sidebar";
import Content from "@/components/molecules/Content";


export const metadata: Metadata = {
  description: "Next.jsを使ったすんごいチャットアプリケーション😎",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
