import {
  CreateUserInput,
  RegisteredUserInput,
  RegisteredUserModel,
  UserNode,
} from "@/graphql/graphql";
import { postWithoutCache } from "@/lib/server/utils";

export async function executeQueryRegisteredUser(input: RegisteredUserInput) {
  const { data, errors } = await postWithoutCache<
    {
      data: RegisteredUserModel;
    },
    { input: RegisteredUserInput }
  >("/api/user/is-registered-user", {
    input,
  });
  return { registeredUser: data.data, errors };
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
