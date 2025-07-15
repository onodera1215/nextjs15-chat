import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { fromPrismaUserToUserDomain } from './utils';
import { UserDomain } from '../user.domain';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

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
