import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UserNode } from './models/user.model';
import { CreateUserInput } from './models/create-user.input';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { Public } from 'src/auth/public.decorator';
import { RegisteredUserInput } from './models/is-registered-user.input';
import { RegisteredUserUsecase } from './usecase/registered-user.usecase';
import { RegisteredUserModel } from './models/is-registered-user.model';
import { GetUserUsecase } from './usecase/get-user.usecase';
import { GetUserByEmailUsecase } from './usecase/get-user-by-email.usecase';
import { CurrentPayload } from 'src/auth/current-payload.decorator';
import { JwtPayload } from 'src/types';
import { GetMeUsecase } from './usecase/get-me.usecase';
import { GetUsersUsecase } from './usecase/get-users.usecase';
import { SearchUsersInput } from './models/search-users.input';
import { CreateUserPayload } from './models/create-user.payload';

@Resolver()
export class UserResolver {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly registeredUserUsecase: RegisteredUserUsecase,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly getUserByEmailUsecase: GetUserByEmailUsecase,
    private readonly getMeUsecase: GetMeUsecase,
    private readonly getUsersUsecase: GetUsersUsecase,
  ) {}

  @Public()
  @Mutation(() => CreateUserPayload, { description: 'ユーザー新規作成' })
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserPayload> {
    const user = await this.createUserUsecase.execute(input);
    return { user };
  }

  /**
   * @returns ユーザーの登録判定用
   */
  @Public()
  @Query(() => RegisteredUserModel, {
    description: 'ユーザーが登録済みかどうかを判定します。',
  })
  async registeredUser(
    @Args('input') input: RegisteredUserInput,
  ): Promise<RegisteredUserModel> {
    return await this.registeredUserUsecase.execute(input);
  }

  @Query(() => UserNode, {
    description: '指定したIDのユーザーを取得します。',
  })
  async user(@Args('userId') userId: string): Promise<UserNode | null> {
    return await this.getUserUsecase.execute(userId);
  }

  @Query(() => [UserNode], {
    description: 'ユーザー一覧情報を取得します。',
  })
  async users(
    @Args('input', { nullable: true }) input?: SearchUsersInput,
  ): Promise<UserNode[]> {
    return await this.getUsersUsecase.execute(input);
  }

  @Query(() => UserNode, {
    description: '指定したemailを持つユーザーを取得します。',
  })
  async userByEmail(@Args('email') email: string): Promise<UserNode | null> {
    return await this.getUserByEmailUsecase.execute(email);
  }

  @Query(() => UserNode, {
    description: 'ログインユーザーの情報を取得します',
  })
  async me(@CurrentPayload() payload: JwtPayload): Promise<UserNode | null> {
    return await this.getMeUsecase.execute(payload);
  }
}
