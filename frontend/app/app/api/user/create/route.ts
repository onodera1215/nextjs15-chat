import { graphql } from "@/graphql";
import {
  CreateUserInput,
  CreateUserMutation as CreateUserMutationType,
} from "@/graphql/graphql";
import { executeGql } from "@/lib/server/utils";

const CreateUserMutation = graphql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        name
        email
        oauthProvider
        status
        createdAt
        updatedAt
      }
    }
  }
`);

export async function POST(request: Request) {
  const { input } = await request.json();
  const { data, errors } = await executeGql<
    CreateUserMutationType,
    { input: CreateUserInput }
  >(CreateUserMutation, { input });
  return new Response(JSON.stringify({ createUser: data, errors }), {
    headers: { "Content-Type": "application/json" },
  });
}
