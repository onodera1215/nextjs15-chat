import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchOptionInput } from './inputs/searchOption.input';
import { Message } from './models/message.model';
import { MessageService } from './message.service';

@Resolver()
export class MessageResolver {
  /**
   *
   * 一旦べたがきでDBとの疎通確認
   */

  constructor(private service: MessageService) {}

  @Query(() => [Message])
  async messages(@Args('input') input: SearchOptionInput) {
    return await this.service.findMessages(input);
  }
}
