import { CreateUserInput, UserNode } from "@/graphql/graphql";
import { postWithoutCache } from "@/lib/server/utils";

export async function executeQueryIsRegisteredUser(email: string) {
  const { data, errors } = await postWithoutCache<
    {
      isRegisteredUser: boolean;
    },
    { email: string }
  >("/api/user/is-registered-user", {
    email,
  });
  return { isRegisteredUser: data, error: errors };
}

export async function executeMutationCreateUser(input: CreateUserInput) {
  return await postWithoutCache<
    {
      userNode: UserNode;
    },
    { input: CreateUserInput }
  >("/api/user/create", {
    input,
  });
}
