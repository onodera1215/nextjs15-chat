import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UserNode } from './gql-models/user.model';
import { CreateUserInput } from './gql-models/create-user.input';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { Public } from 'src/auth/public.decorator';
import { RegisteredUserInput } from './gql-models/is-registered-user.input';
import { RegisteredUserUsecase } from './usecase/registered-user.usecase';
import { RegisteredUserModel } from './gql-models/is-registered-user.model';
import { GetUserUsecase } from './usecase/get-user.usecase';
import { GetUserByEmailUsecase } from './usecase/get-user-by-email.usecase';

@Resolver()
export class UserResolver {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly registeredUserUsecase: RegisteredUserUsecase,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly getUserByEmailUsecase: GetUserByEmailUsecase,
  ) {}

  @Public()
  @Mutation(() => UserNode)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserNode> {
    return await this.createUserUsecase.execute(input);
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

  @Query(() => UserNode, {
    description: '指定したemailを持つユーザーを取得します。',
  })
  async userByEmail(@Args('email') email: string): Promise<UserNode | null> {
    return await this.getUserByEmailUsecase.execute(email);
  }
}
