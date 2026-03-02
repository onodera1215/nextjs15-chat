import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { RoomNode } from './models/room.model';
import { CreateRoomInput } from './models/room.input';
import { CreateRoomUsecase } from './usecase/create-room.usecase';
import { SearchRoomOptionInput } from './models/search-room-option.input';
import { GetRoomUsecase } from './usecase/get-room.usecase';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { CreateRoomPayload } from './models/create-room.payload';
import { CurrentPayload } from 'src/auth/current-payload.decorator';
import { JwtPayload } from 'src/types';
import { RoomConnection } from './models/room.connection';
import { SearchRoomsUsecase } from './usecase/search-rooms.usecase';

@Resolver()
export class RoomResolver {
  constructor(
    private readonly createRoomUsecase: CreateRoomUsecase,
    private readonly searchRoomsUsecase: SearchRoomsUsecase,
    private readonly getRoomUsecase: GetRoomUsecase,

    @Inject('GqlPubSub')
    private readonly gqlPubSub: PubSub,
  ) {}

  @Mutation(() => CreateRoomPayload, { description: 'ルーム新規作成' })
  async createRoom(
    @Args('input') input: CreateRoomInput,
    @CurrentPayload() payload: JwtPayload,
  ): Promise<CreateRoomPayload> {
    const room = await this.createRoomUsecase.execute({
      ...input,
      createdByUserId: payload.sub!,
    });
    await this.gqlPubSub.publish('roomCreated', { roomCreated: room });
    return { room };
  }

  @Query(() => RoomConnection, { description: 'ルーム一覧取得' })
  async rooms(
    @Args('input', { nullable: true }) input?: SearchRoomOptionInput,
  ): Promise<RoomConnection> {
    return await this.searchRoomsUsecase.execute(input);
  }

  @Query(() => RoomConnection, { description: '所属しているルーム一覧取得' })
  async myRooms(
    @CurrentPayload() payload: JwtPayload,
    @Args('input', { nullable: true }) input?: SearchRoomOptionInput,
  ): Promise<RoomConnection> {
    return await this.searchRoomsUsecase.execute({
      ...input,
      userId: payload.sub!,
    });
  }

  @Query(() => RoomNode, { description: 'ルーム取得', nullable: true })
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
