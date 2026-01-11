'use server';

import Header from "@/components/molecules/Header";
import "../globals.css";
import Sidebar from "@/components/molecules/Sidebar";
import Content from "@/components/molecules/Content";
import BrowserApolloProvider from "@/components/atoms/ApolloProvider";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";


export default async function AuthPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authentication = await auth();
  const token = authentication?.nestAccessToken;
  if (!token) {
    redirect('/login');
  }
  return (
    <SessionProvider>
      <BrowserApolloProvider token={token}>
        <main className="grid grid-rows-[8vh_1fr] h-screen">
          <Header />
          <div className="grid grid-cols-12">
            <div className="hidden lg:col-span-3 lg:block bg-surface ">
              <Sidebar />
            </div>
            <div className="lg:col-span-9 block col-span-12">
              <Content>
                {children}
              </Content>
            </div>
          </div>
        </main>
      </BrowserApolloProvider>
    </SessionProvider>
  );
}
