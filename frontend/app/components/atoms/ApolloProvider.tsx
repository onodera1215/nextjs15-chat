"use client";

import { createApolloClient, setToken } from "@/lib/client/utils";
import { ApolloProvider } from "@apollo/client/react";

export default function BrowserApolloProvider({
  children,
  token,
}: {
  token: string;
  children: React.ReactNode;
}) {
  // インメモリストアに保存しておく(Redux Toolkit Queryでの利用の為)
  setToken(token);
  return (
    <ApolloProvider client={createApolloClient()}>{children}</ApolloProvider>
  );
}
