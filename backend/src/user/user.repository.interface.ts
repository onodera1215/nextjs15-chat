import { CreateUserInput } from './models/create-user.input';
import { SearchUsersInput } from './models/search-users.input';
import { UserDomain } from './user.domain';

export interface SearchUsersDto {
  users: UserDomain[];
  totalCount: number;
  hasNextPage: boolean;
}

export interface IUserRepository {
  createUser(input: CreateUserInput): Promise<UserDomain>;
  findByOauthProviderAccountId(
    oauthProviderAccountId: string,
  ): Promise<UserDomain | null>;
  findById(userId: string): Promise<UserDomain | null>;
  findByEmail(email: string): Promise<UserDomain | null>;
  searchUsers(params?: SearchUsersInput): Promise<SearchUsersDto>;
}
