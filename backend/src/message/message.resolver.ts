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
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { SearchMessagesInput } from './models/search-messages.input';
import { CreateMessageInput } from './models/create-message.input';
import { GetRoomUsecase } from 'src/room/usecase/get-room.usecase';
import { GetUserUsecase } from 'src/user/usecase/get-user.usecase';
import { UserNode } from 'src/user/models/user.model';
import { CurrentPayload } from 'src/auth/current-payload.decorator';
import { JwtPayload } from 'src/types';
import { CreateMessagePayload } from './models/create-message.payload';
import { MessageConnection } from './models/message.connection';
import { SearchMessageUsecase } from './usecase/search-message.usecase';
import { RoomNode } from 'src/room/models/room.model';

@Resolver(() => MessageNode)
export class MessageResolver {
  constructor(
    private readonly createMessageUsecase: CreateMessageUsecase,
    private readonly searchMessageUsecase: SearchMessageUsecase,
    // フィールドリゾルバーでroom取得するときに使う
    private readonly getRoomUsecase: GetRoomUsecase,
    // フィールドリゾルバーでsender取得するときに使う
    private readonly getUserUsecase: GetUserUsecase,

    @Inject('GqlPubSub')
    private readonly gqlPubSub: PubSub,
  ) {}

  @Query(() => MessageConnection)
  async messages(
    @Args('input') input: SearchMessagesInput,
  ): Promise<MessageConnection> {
    return await this.searchMessageUsecase.execute(input);
  }

  @ResolveField(() => RoomNode)
  async room(@Parent() message: MessageNode) {
    return await this.getRoomUsecase.execute(message.roomId);
  }

  @ResolveField(() => UserNode)
  async sender(@Parent() message: MessageNode) {
    return await this.getUserUsecase.execute(message.senderId);
  }

  @Mutation(() => CreateMessagePayload)
  async createMessage(
    @Args('input') input: CreateMessageInput,
    @CurrentPayload() user: JwtPayload,
  ) {
    // メッセージ登録
    const message = await this.createMessageUsecase.execute({
      ...input,
      senderId: user.sub!,
    });
    // パブリッシュ
    await this.gqlPubSub.publish('messageCreated', { messageCreated: message });
    return { message };
  }

  @Subscription(() => MessageNode)
  messageCreated() {
    return this.gqlPubSub.asyncIterableIterator<MessageNode>('messageCreated');
  }
}
