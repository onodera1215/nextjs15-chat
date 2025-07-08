import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserNode } from './gql-models/user.model';
import { CreateUserInput } from './gql-models/create-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserNode)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserNode> {
    return await this.userService.createUser(input);
  }
}
