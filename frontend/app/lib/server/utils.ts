import "server-only";

import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { auth } from "@/auth";

/**
 * RSC用のApollo Clientを登録します。
 */
export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const session = await auth();
    const httpLink = new HttpLink({
      uri: process.env.NEST_GQL_URL,
    });

    const accessToken = session?.accessToken ?? "";
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }
);
