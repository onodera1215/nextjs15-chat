import "server-only";
import { SetContextLink } from "@apollo/client/link/context";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { TypedDocumentString } from "@/graphql/graphql";
import { HttpLink } from "@apollo/client";
import { auth } from "@/auth";

/**
 * backend用のApollo Clientを登録します。
 */
export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const session = await auth();
    const httpLink = new HttpLink({
      uri: process.env.NEST_GQL_URL,
    });

    const nestAccessToken = session?.nestAccessToken ?? "";
    const authLink = new SetContextLink((prevContext) => {
      const { headers } = prevContext;
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
 * serversideでGraphQLクエリを実行します。
 * @param {TypedDocumentString<TResult, TVariables>} query
 * @param {[TVariables | undefined]} param
 * @returns {Promise<TResult>}
 */
export async function executeGql<TResult, TVariables = undefined>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch(process.env.NEST_GQL_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("GraphQL query failed");
  }

  return response.json() as TResult;
}

async function fetchWithoutCache<T>(path: string, init?: RequestInit) {
  const url = process.env.BACKEND_URL!;
  const response = await fetch(url + path, { ...init, cache: "no-store" });
  return (await response.json()) as T;
}

export async function postWithoutCache<T, S = undefined>(
  path: string,
  body?: S
) {
  return (await fetchWithoutCache(path, {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
  })) as T;
}

export async function getWithoutCache<T>(path: string) {
  return (await fetchWithoutCache(path, {
    method: "GET",
    headers: { accept: "application/json" },
  })) as T;
}
