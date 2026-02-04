import { Inject, Injectable } from '@nestjs/common';
import { IRoomRepository } from '../room.repository.interface';
import { RoomNode } from '../models/room.model';

@Injectable()
export class GetRoomUsecase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(roomId: string): Promise<RoomNode | null> {
    return await this.roomRepository.findById(roomId);
  }
}
