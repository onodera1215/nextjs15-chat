import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RoomNode } from './gql-model/room.model';
import { CreateRoomInput } from './gql-model/room.input';
import { CreateRoomUsecase } from './usecase/create-room.usecase';

@Resolver()
export class RoomResolver {
  constructor(private readonly createRoomUsecase: CreateRoomUsecase) {}

  @Mutation(() => RoomNode)
  async createRoom(@Args('input') input: CreateRoomInput): Promise<RoomNode> {
    return await this.createRoomUsecase.execute(input);
  }
}
