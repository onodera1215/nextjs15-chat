import { graphql } from "@/graphql";
import {
  RegisteredUserInput,
  RegisteredUserQuery as RegisteredUserQueryType,
} from "@/graphql/graphql";
import { executeGql } from "@/lib/server/utils";

const RegisteredUserQuery = graphql(`
  query RegisteredUser($input: RegisteredUserInput!) {
    registeredUser(input: $input) {
      isRegistered
      isRegisteredInAnotherProvider
      user {
        id
      }
    }
  }
`);

export async function POST(request: Request) {
  const { input }: { input: RegisteredUserInput } = await request.json();
  const { data, errors } = await executeGql<
    RegisteredUserQueryType,
    { input: RegisteredUserInput }
  >(RegisteredUserQuery, { input });
  return new Response(JSON.stringify({ data: data.registeredUser, errors }), {
    headers: { "Content-Type": "application/json" },
  });
}
