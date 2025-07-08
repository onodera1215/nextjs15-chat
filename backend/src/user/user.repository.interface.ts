import { CreateUserInput } from './gql-models/create-user.input';
import { UserNode } from './gql-models/user.model';

export interface IUserRepository {
  createUser(input: CreateUserInput): Promise<UserNode>;
  findByEmail(email: string): Promise<UserNode | null>;
}
