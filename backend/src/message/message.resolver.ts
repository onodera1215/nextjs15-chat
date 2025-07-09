import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SearchOptionInput } from './inputs/search-option.input';
import { Message } from './models/message.model';
import { CreateMessageInput } from './inputs/create-message.input';
import { CreateMessageUsecase } from './usecase/create-message.usecase';
import { GetsMessageUsecase } from './usecase/gets-message.usecase';

@Resolver()
export class MessageResolver {
  constructor(
    private readonly createMessageUsecase: CreateMessageUsecase,
    private readonly getsMessageUsecase: GetsMessageUsecase,
  ) {}

  @Query(() => [Message])
  async messages(@Args('input') input: SearchOptionInput) {
    return await this.getsMessageUsecase.execute(input);
  }

  @Mutation(() => Message)
  async createMessage(@Args('input') input: CreateMessageInput) {
    return await this.createMessageUsecase.execute(input);
  }
}
