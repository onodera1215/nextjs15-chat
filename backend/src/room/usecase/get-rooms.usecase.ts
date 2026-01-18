import { Inject, Injectable } from '@nestjs/common';
import { IRoomRepository } from '../room.repository.interface';
import { SearchRoomOptionInput } from '../gql-model/search-room-option.input';
import { RoomNode } from '../gql-model/room.model';

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
