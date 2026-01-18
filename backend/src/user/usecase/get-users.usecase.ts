import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { UserNode } from '../gql-models/user.model';
import { SearchUsersInput } from '../gql-models/search-users.input';

@Injectable()
export class GetUsersUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params?: SearchUsersInput): Promise<UserNode[]> {
    return await this.userRepository.searchUsers(params);
  }
}
