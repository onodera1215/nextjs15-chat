import { CreateUserInput } from './gql-models/create-user.input';
import { UserDomain } from './user.domain';

export interface IUserRepository {
  createUser(input: CreateUserInput): Promise<UserDomain>;
  findByEmail(email: string): Promise<UserDomain | null>;
}
