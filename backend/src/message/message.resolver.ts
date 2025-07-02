import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchOptionInput } from './inputs/searchOption.input';
import { Message } from './models/message.model';

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  messages(@Args('input') input: SearchOptionInput) {
    console.log(input);
    return [];
  }
}
