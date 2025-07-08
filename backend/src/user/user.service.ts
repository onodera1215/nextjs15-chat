import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { CreateUserInput } from './gql-models/create-user.input';
import { UserNode } from './gql-models/user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(input: CreateUserInput): Promise<UserNode> {
    return await this.userRepository.createUser(input);
  }
}
