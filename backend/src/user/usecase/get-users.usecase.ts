import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { SearchUsersInput } from '../models/search-users.input';
import { UserConnection } from '../models/user-connection.model';
import { cursorEncoder } from 'src/common/utils';

@Injectable()
export class GetUsersUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params?: SearchUsersInput): Promise<UserConnection> {
    const { users, totalCount, hasNextPage } =
      await this.userRepository.searchUsers(params);

    const endUser = users.length > 0 ? users.at(-1) : undefined;
    const endCursor = endUser
      ? cursorEncoder({ id: endUser.id, createdAt: endUser.createdAt })
      : undefined;

    return {
      edges: users.map((user) => ({
        cursor: cursorEncoder({ id: user.id, createdAt: user.createdAt }),
        node: user,
      })),
      nodes: users,
      pageInfo: {
        hasNextPage,
        endCursor,
      },
      totalCount,
    };
  }
}
