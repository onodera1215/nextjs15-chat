import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { RoomNode } from './gql-model/room.model';
import { CreateRoomInput } from './gql-model/room.input';
import { CreateRoomUsecase } from './usecase/create-room.usecase';
import { GetRoomsUsecase } from './usecase/get-rooms.usecase';
import { SearchRoomOptionInput } from './gql-model/search-room-option.input';
import { GetRoomUsecase } from './usecase/get-room.usecase';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Public } from 'src/auth/public.decorator';

@Resolver()
export class RoomResolver {
  constructor(
    private readonly createRoomUsecase: CreateRoomUsecase,
    private readonly getRoomsUsecase: GetRoomsUsecase,
    private readonly getRoomUsecase: GetRoomUsecase,

    @Inject('GqlPubSub')
    private readonly gqlPubSub: PubSub,
  ) {}

  @Mutation(() => RoomNode, { description: 'ルーム新規作成' })
  async createRoom(@Args('input') input: CreateRoomInput): Promise<RoomNode> {
    const room = await this.createRoomUsecase.execute(input);
    await this.gqlPubSub.publish('roomCreated', { roomCreated: room });
    return room;
  }

  @Query(() => [RoomNode], { description: 'ルーム一覧取得' })
  async rooms(
    @Args('input', { nullable: true }) input?: SearchRoomOptionInput,
  ): Promise<RoomNode[]> {
    return await this.getRoomsUsecase.execute(input);
  }

  @Query(() => RoomNode, { description: 'ルーム取得' })
  async room(
    @Args('id', { type: () => String }) id: string,
  ): Promise<RoomNode | null> {
    return await this.getRoomUsecase.execute(id);
  }

  @Subscription(() => RoomNode)
  roomCreated() {
    return this.gqlPubSub.asyncIterableIterator<RoomNode>('roomCreated');
  }
}
