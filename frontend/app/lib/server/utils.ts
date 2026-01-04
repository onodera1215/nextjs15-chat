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
 * @returns {Promise<{data: TResult, errors: unknown[] | undefined}>}
 */
export async function executeGql<TResult, TVariables = unknown>(
  query: TypedDocumentString<TResult, TVariables>,
  variables: TVariables
) {
  const response = await fetch(process.env.NEST_GQL_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) throw new Error("GraphQL query failed");

  const { data, errors } = (await response.json()) as {
    data: TResult;
    errors: unknown[] | undefined;
  };

  return { data, errors };
}

async function fetchWithoutCache<T>(path: string, init?: RequestInit) {
  const url = process.env.BFF_URL! + path;
  const response = await fetch(url, { ...init, cache: "no-store" });
  const data = await response.json();
  return { data: data, errors: data?.errors } as {
    data: T;
    errors: unknown[] | undefined;
  };
}

export async function postWithoutCache<T, S = undefined>(
  path: string,
  body?: S
) {
  const result = await fetchWithoutCache<{
    data: T;
    errors: unknown[] | undefined;
  }>(path, {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
  });
  return { data: result.data, errors: result?.errors } as {
    data: T;
    errors: unknown[] | undefined;
  };
}
