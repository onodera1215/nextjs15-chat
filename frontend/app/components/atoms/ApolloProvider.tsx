

"use client";

import { createApolloClient } from "@/lib/client/utils";
import { ApolloProvider } from "@apollo/client/react";

export default function BrowserApolloProvider({
  children,
  token,
}: {
  token: string;
  children: React.ReactNode;
}) {
  return <ApolloProvider client={createApolloClient(token)}>{children}</ApolloProvider>;
}
