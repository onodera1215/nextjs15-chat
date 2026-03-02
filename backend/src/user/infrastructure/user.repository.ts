import { Injectable } from '@nestjs/common';
import { IUserRepository, SearchUsersDto } from '../user.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from '../models/create-user.input';
import { UserStatusEnum } from '../models/user-status.enum';
import { fromPrismaUserToUserDomain } from './utils';
import { UserDomain } from '../user.domain';
import { SearchUsersInput } from '../models/search-users.input';
import { Prisma } from '@prisma/client';
import { cursorDecoder } from 'src/common/utils';
import { PAGINATION_LIMIT } from 'src/common/config';
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(input: CreateUserInput): Promise<UserDomain> {
    const user = await this.prisma.user.create({
      data: {
        ...input,
        status: UserStatusEnum.ACTIVE,
      },
    });

    return fromPrismaUserToUserDomain(user);
  }

  async findByOauthProviderAccountId(
    oauthProviderAccountId: string,
  ): Promise<UserDomain | null> {
    const user = await this.prisma.user.findUnique({
      where: { oauthProviderAccountId },
    });
    if (!user) {
      return null;
    }
    return fromPrismaUserToUserDomain(user);
  }

  async findById(id: string): Promise<UserDomain | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return null;
    }
    return fromPrismaUserToUserDomain(user);
  }

  async findByEmail(email: string): Promise<UserDomain | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return fromPrismaUserToUserDomain(user);
  }

  async searchUsers(params?: SearchUsersInput): Promise<SearchUsersDto> {
    const searechConditions: Prisma.UserWhereInput[] = [];
    if (params?.after) {
      const { id, createdAt } = cursorDecoder(params.after);
      searechConditions.push({
        createdAt: {
          gt: createdAt,
        },
        id: {
          lt: id,
        },
      });
    }

    const users = await this.prisma.user.findMany({
      where: {
        AND: searechConditions,
      },
      take: PAGINATION_LIMIT + 1, // ページングのためにlimitより1件多く取得する
      orderBy: {
        createdAt: Prisma.SortOrder.asc,
      },
    });
    const userDomains = users.map(fromPrismaUserToUserDomain);
    const totalCount = await this.prisma.user.count({
      where: {
        AND: searechConditions,
      },
    });
    const hasNextPage = userDomains.length > PAGINATION_LIMIT;
    return {
      users: userDomains.slice(0, PAGINATION_LIMIT),
      totalCount,
      hasNextPage,
    };
  }
}
