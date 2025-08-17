import { User } from '@prisma/client';
import { UserStatusEnum } from '../gql-models/user-status.enum';
import { UserDomain } from '../user.domain';

export function fromPrismaUserToUserDomain(user: User): UserDomain {
  return new UserDomain({
    ...user,
    status: UserStatusEnum[user.status as keyof typeof UserStatusEnum],
  });
}
