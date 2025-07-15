import { UserDomain } from './user.domain';

export interface IUserRepository {
  findById(userId: string): Promise<UserDomain | null>;
}
