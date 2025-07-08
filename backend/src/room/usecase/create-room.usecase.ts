import { Inject, Injectable } from '@nestjs/common';
import { RoomNode } from '../gql-model/room.model';
import { CreateRoomInput } from '../gql-model/room.input';
import { IRoomRepository } from '../room.repository.interface';

@Injectable()
export class CreateRoomUsecase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(input: CreateRoomInput): Promise<RoomNode> {
    return await this.roomRepository.createRoom(input);
  }
}
