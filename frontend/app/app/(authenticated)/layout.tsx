"use server";

import "../globals.css";
import BrowserApolloProvider from "@/components/atoms/ApolloProvider";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import ClientComponentsWrapper from "@/components/organizations/ClientComponentsWrapper";
import Header from "@/components/molecules/Header";

export default async function AuthPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authentication = await auth();
  const token = authentication?.nestAccessToken;
  if (!token) {
    return redirect("/login");
  }
  return (
    <SessionProvider>
      <BrowserApolloProvider token={token}>
        <main className="grid grid-rows-[8vh_1fr] h-screen">
          <Header />
          <ClientComponentsWrapper>{children}</ClientComponentsWrapper>
        </main>
      </BrowserApolloProvider>
    </SessionProvider>
  );
}
