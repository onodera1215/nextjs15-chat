import { graphql } from "@/graphql";
import { CreateUserInput, UserNode } from "@/graphql/graphql";
import { executeGql } from "@/lib/server/utils";

const CreateUserMutation = graphql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      oauthProvider
      status
      createdAt
      updatedAt
    }
  }
`);

export async function POST(request: Request) {
  const { input } = await request.json();
  const { data, errors } = await executeGql<
    { createUser: UserNode },
    { input: CreateUserInput }
  >(CreateUserMutation, { input });
  return new Response(JSON.stringify({ createUser: data.createUser, errors }), {
    headers: { "Content-Type": "application/json" },
  });
}
