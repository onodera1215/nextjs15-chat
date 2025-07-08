import { User } from 'prisma/generated';
import { UserNode } from '../gql-models/user.model';
import { UserStatusEnum } from '../gql-models/user-status.enum';

export function fromPrismaUserToUserNode(user: User): UserNode {
  return {
    ...user,
    status: UserStatusEnum[user.status as keyof typeof UserStatusEnum],
  };
}
