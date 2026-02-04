import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { UserNode } from '../models/user.model';
import { SearchUsersInput } from '../models/search-users.input';

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
