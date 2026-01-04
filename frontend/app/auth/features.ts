import {
  CreateUserInput,
  IsRegisteredUserInput,
  IsRegisteredUserModel,
  UserNode,
} from "@/graphql/graphql";
import { postWithoutCache } from "@/lib/server/utils";

export async function executeQueryIsRegisteredUser(
  input: IsRegisteredUserInput
) {
  const { data, errors } = await postWithoutCache<
    {
      isRegisteredUser: IsRegisteredUserModel;
    },
    { input: IsRegisteredUserInput }
  >("/api/user/is-registered-user", {
    input,
  });
  return { isRegisteredUser: data.isRegisteredUser, errors };
}

export async function executeMutationCreateUser(input: CreateUserInput) {
  const { data, errors } = await postWithoutCache<
    {
      createUser: UserNode;
    },
    { input: CreateUserInput }
  >("/api/user/create", {
    input,
  });

  return { userNode: data.createUser, errors };
}
