import { graphql } from "@/graphql";
import { RegisteredUserInput, RegisteredUserModel } from "@/graphql/graphql";
import { executeGql } from "@/lib/server/utils";

const RegisteredUserQuery = graphql(`
  query RegisteredUser($input: RegisteredUserInput!) {
    registeredUser(input: $input) {
      isRegistered
      isRegisteredInAnotherProvider
    }
  }
`);

export async function POST(request: Request) {
  const { input }: { input: RegisteredUserInput } = await request.json();
  const { data, errors } = await executeGql<
    { registeredUser: RegisteredUserModel },
    { input: RegisteredUserInput }
  >(RegisteredUserQuery, { input });
  return new Response(JSON.stringify({ data: data.registeredUser, errors }), {
    headers: { "Content-Type": "application/json" },
  });
}
