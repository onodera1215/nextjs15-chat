import { Inject, Injectable } from '@nestjs/common';
import { IRoomRepository } from '../room.repository.interface';
import { SearchRoomOptionInput } from '../models/search-room-option.input';
import { RoomNode } from '../models/room.model';

@Injectable()
export class GetRoomsUsecase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(searchOption?: SearchRoomOptionInput): Promise<RoomNode[]> {
    return await this.roomRepository.findAllBySearchRoomOption(searchOption);
  }
}
