import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UserNode } from './gql-models/user.model';
import { CreateUserInput } from './gql-models/create-user.input';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { Public } from 'src/auth/public.decorator';
import { RegisteredUserInput } from './gql-models/is-registered-user.input';
import { RegisteredUserUsecase } from './usecase/registered-user.usecase';
import { RegisteredUserModel } from './gql-models/is-registered-user.model';

@Resolver()
export class UserResolver {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly registeredUserUsecase: RegisteredUserUsecase,
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
}
