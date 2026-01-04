import { graphql } from "@/graphql";
import {
  IsRegisteredUserInput,
  IsRegisteredUserModel,
} from "@/graphql/graphql";
import { executeGql } from "@/lib/server/utils";

const IsRegisteredUserQuery = graphql(`
  query IsRegisteredUser($input: IsRegisteredUserInput!) {
    isRegisteredUser(input: $input) {
      isRegistered
      isRegisteredInAnotherProvider
    }
  }
`);

export async function POST(request: Request) {
  const { input }: { input: IsRegisteredUserInput } = await request.json();
  const { data, errors } = await executeGql<
    { isRegisteredUser: IsRegisteredUserModel },
    { input: IsRegisteredUserInput }
  >(IsRegisteredUserQuery, { input });
  return new Response(JSON.stringify({ data: data.isRegisteredUser, errors }), {
    headers: { "Content-Type": "application/json" },
  });
}
