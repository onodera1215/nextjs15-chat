import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from '../gql-models/create-user.input';
import { UserStatusEnum } from '../gql-models/user-status.enum';
import { fromPrismaUserToUserDomain } from './utils';
import { UserDomain } from '../user.domain';

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

  async findByEmail(email: string): Promise<UserDomain | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
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
}
