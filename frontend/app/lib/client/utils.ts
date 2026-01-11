"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

let link: GraphQLWsLink | null = null;
function createWsLinkSingleton(token: string) {
  if (!link) {
    link = new GraphQLWsLink(
      createClient({
        url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL!,
        connectionParams: async () => {
          return { Authorization: `Bearer ${token}` };
        },
        retryAttempts: 10,
        lazy: true,
      })
    );
    return link;
  }
  return link;
}

let httpLink: HttpLink | null = null;
function createHttpLinkSingleton(token: string) {
  if (!httpLink) {
    httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return httpLink;
  }
  return httpLink;
}

let apolloClient: ApolloClient | null = null;
export function createApolloClient(token: string) {
  const httpLink = createHttpLinkSingleton(token);
  const wsLink = createWsLinkSingleton(token);

  const link = ApolloLink.split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return (
        def.kind === "OperationDefinition" && def.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  if (!apolloClient) {
    apolloClient = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }
  return apolloClient;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
