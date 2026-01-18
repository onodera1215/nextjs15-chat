import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { MessageNode } from './models/message.model';
import { CreateMessageUsecase } from './usecase/create-message.usecase';
import { GetsMessageUsecase } from './usecase/gets-message.usecase';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { SearchMessagesInput } from './models/search-messages.input';
import { CreateMessageInput } from './models/create-message.input';
import { RoomNode } from 'src/room/gql-model/room.model';
import { GetRoomUsecase } from 'src/room/usecase/get-room.usecase';
import { GetUserUsecase } from 'src/user/usecase/get-user.usecase';
import { UserNode } from 'src/user/gql-models/user.model';

@Resolver(() => MessageNode)
export class MessageResolver {
  constructor(
    private readonly createMessageUsecase: CreateMessageUsecase,
    private readonly getsMessageUsecase: GetsMessageUsecase,
    // フィールドリゾルバーでroom取得するときに使う
    private readonly getRoomUsecase: GetRoomUsecase,
    // フィールドリゾルバーでsender取得するときに使う
    private readonly getUserUsecase: GetUserUsecase,

    @Inject('GqlPubSub')
    private readonly gqlPubSub: PubSub,
  ) {}

  @Query(() => [MessageNode])
  async messages(@Args('input') input: SearchMessagesInput) {
    return await this.getsMessageUsecase.execute(input);
  }

  @ResolveField(() => RoomNode)
  async room(@Parent() message: MessageNode) {
    return await this.getRoomUsecase.execute(message.roomId);
  }

  @ResolveField(() => UserNode)
  async sender(@Parent() message: MessageNode) {
    return await this.getUserUsecase.execute(message.senderId);
  }

  @Mutation(() => MessageNode)
  async createMessage(@Args('input') input: CreateMessageInput) {
    // メッセージ登録
    const message = await this.createMessageUsecase.execute(input);
    // パブリッシュ
    await this.gqlPubSub.publish('messageCreated', { messageCreated: message });
    return message;
  }

  @Subscription(() => MessageNode)
  messageCreated() {
    return this.gqlPubSub.asyncIterableIterator<MessageNode>('messageCreated');
  }
}
