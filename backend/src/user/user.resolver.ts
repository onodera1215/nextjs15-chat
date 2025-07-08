import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserNode } from './gql-models/user.model';
import { CreateUserInput } from './gql-models/create-user.input';
import { CreateUserUsecase } from './usecase/create-user.usecase';

@Resolver()
export class UserResolver {
  constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @Mutation(() => UserNode)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserNode> {
    return await this.createUserUsecase.execute(input);
  }
}
