import { CreateUserInput } from './gql-models/create-user.input';
import { UserNode } from './gql-models/user.model';
import { IUserRepository } from './user.repository.interface';

export class User {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(input: CreateUserInput): Promise<UserNode> {
    return await this.userRepository.createUser(input);
  }
}
