import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { Message } from './models/message.model';
import { CreateMessageUsecase } from './usecase/create-message.usecase';
import { GetsMessageUsecase } from './usecase/gets-message.usecase';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { SearchOptionInput } from './models/search-option.input';
import { CreateMessageInput } from './models/create-message.input';
import { RoomNode } from 'src/room/gql-model/room.model';
import { GetRoomUsecase } from 'src/room/usecase/get-room.usecase';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly createMessageUsecase: CreateMessageUsecase,
    private readonly getsMessageUsecase: GetsMessageUsecase,
    private readonly getRoomUsecase: GetRoomUsecase,

    @Inject('GqlPubSub')
    private readonly gqlPubSub: PubSub,
  ) {}

  @Query(() => [Message])
  async messages(@Args('input') input: SearchOptionInput) {
    return await this.getsMessageUsecase.execute(input);
  }

  @ResolveField(() => RoomNode)
  async room(@Parent() message: Message) {
    return await this.getRoomUsecase.execute(message.roomId);
  }

  @Mutation(() => Message)
  async createMessage(@Args('input') input: CreateMessageInput) {
    // メッセージ登録
    const message = await this.createMessageUsecase.execute(input);
    // パブリッシュ
    await this.gqlPubSub.publish('messageCreated', { messageCreated: message });
    return message;
  }

  @Subscription(() => Message)
  messageCreated() {
    return this.gqlPubSub.asyncIterableIterator<Message>('messageCreated');
  }
}
