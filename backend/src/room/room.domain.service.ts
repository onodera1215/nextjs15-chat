import { Inject } from '@nestjs/common';
import { CreateRoomInput } from './gql-model/room.input';
import { RoomNode } from './gql-model/room.model';
import { IRoomRepository } from './room.repository.interface';

export class RoomDomain {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}

  async createRoom(input: CreateRoomInput): Promise<RoomNode> {
    return await this.roomRepository.createRoom(input);
  }
}
