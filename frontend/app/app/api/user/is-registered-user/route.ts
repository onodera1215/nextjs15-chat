import { graphql } from "@/graphql";
import { IsRegisteredUserInput } from "@/graphql/graphql";
import { executeGql } from "@/lib/server/utils";

const IsRegisteredUserQuery = graphql(`
  query IsRegisteredUser($input: IsRegisteredUserInput!) {
    isRegisteredUser(input: $input)
  }
`);

export async function POST(request: Request) {
  const { input }: { input: IsRegisteredUserInput } = await request.json();
  const { data, errors } = await executeGql<
    { isRegisteredUser: boolean },
    { input: IsRegisteredUserInput }
  >(IsRegisteredUserQuery, { input });
  return new Response(
    JSON.stringify({ isRegisteredUser: data.isRegisteredUser, errors }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
