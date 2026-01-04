import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UserNode } from './gql-models/user.model';
import { CreateUserInput } from './gql-models/create-user.input';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { Public } from 'src/auth/public.decorator';
import { IsRegisteredUserInput } from './gql-models/is-registered-user.input';
import { IsRegisteredUserUsecase } from './usecase/is-registered-user.usecase';
import { IsRegisteredUserModel } from './gql-models/is-registered-user.model';

@Resolver()
export class UserResolver {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly isRegisteredUserUsecase: IsRegisteredUserUsecase,
  ) {}

  @Public()
  @Mutation(() => UserNode)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserNode> {
    return await this.createUserUsecase.execute(input);
  }

  /**
   * @returns ユーザーが登録済みの場合はtrue、それ以外はfalse
   */
  @Public()
  @Query(() => IsRegisteredUserModel, {
    description: 'ユーザーが登録済みかどうかを判定します。',
  })
  async isRegisteredUser(
    @Args('input') input: IsRegisteredUserInput,
  ): Promise<IsRegisteredUserModel> {
    return await this.isRegisteredUserUsecase.execute(input);
  }
}
