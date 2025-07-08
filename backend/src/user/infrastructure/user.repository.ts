import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNode } from '../gql-models/user.model';
import { CreateUserInput } from '../gql-models/create-user.input';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(input: CreateUserInput): Promise<UserNode> {
    return await this.prisma.user.create({
      data: {
        ...input,
      },
    });
  }
}
