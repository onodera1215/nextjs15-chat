import { CreateUserInput } from './gql-models/create-user.input';
import { UserDomain } from './user.domain';

export interface IUserRepository {
  createUser(input: CreateUserInput): Promise<UserDomain>;
  findByOauthProviderAccountId(
    oauthProviderAccountId: string,
  ): Promise<UserDomain | null>;
  findById(userId: string): Promise<UserDomain | null>;
  findByEmail(email: string): Promise<UserDomain | null>;
}
