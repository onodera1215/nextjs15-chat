import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNode } from '../gql-models/user.model';
import { CreateUserInput } from '../gql-models/create-user.input';
import { UserStatusEnum } from '../gql-models/user-status.enum';
import { fromPrismaUserToUserNode } from './utils';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(input: CreateUserInput): Promise<UserNode> {
    const user = await this.prisma.user.create({
      data: {
        ...input,
        status: UserStatusEnum.ACTIVE,
      },
    });

    return fromPrismaUserToUserNode(user);
  }

  async findByEmail(email: string): Promise<UserNode | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return fromPrismaUserToUserNode(user);
  }
}
