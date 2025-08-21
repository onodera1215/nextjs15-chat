"use server";
import "server-only";
import { signIn, signOut } from "@/auth";

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

    const nestAccessToken = session?.nestAccessToken ?? "";
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${nestAccessToken}`,
        },
      };
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }
);

/**
 * googleのOAuth認証用
 */
export async function googleSignIn() {
  await signIn("google", { redirectTo: "/home" });
}

/**
 * githubのOAuth認証用
 */
export async function githubSignIn() {
  await signIn("github", { redirectTo: "/home" });
}

/**
 * ログアウト用
 */
export async function Logout() {
  await signOut();
}
