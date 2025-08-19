import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { RoomNode } from './gql-model/room.model';
import { CreateRoomInput } from './gql-model/room.input';
import { CreateRoomUsecase } from './usecase/create-room.usecase';
import { GetRoomsUsecase } from './usecase/get-rooms.usecase';
import { SearchRoomOptionInput } from './gql-model/search-room-option.input';
import { Public } from 'src/auth/public.decorator';

@Resolver()
export class RoomResolver {
  constructor(
    private readonly createRoomUsecase: CreateRoomUsecase,
    private readonly getRoomsUsecase: GetRoomsUsecase,
  ) {}

  @Mutation(() => RoomNode)
  async createRoom(@Args('input') input: CreateRoomInput): Promise<RoomNode> {
    return await this.createRoomUsecase.execute(input);
  }

  @Public()
  @Query(() => [RoomNode])
  async rooms(
    @Args('input') input: SearchRoomOptionInput,
  ): Promise<RoomNode[]> {
    return await this.getRoomsUsecase.execute(input);
  }
}
