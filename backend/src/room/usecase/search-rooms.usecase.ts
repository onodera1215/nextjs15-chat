import { Inject, Injectable } from '@nestjs/common';
import { IRoomRepository } from '../room.repository.interface';
import { SearchRoomOptionInput } from '../models/search-room-option.input';
import { RoomConnection } from '../models/room.connection';
import { cursorEncoder } from 'src/common/utils';

@Injectable()
export class SearchRoomsUsecase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(searchOption?: SearchRoomOptionInput): Promise<RoomConnection> {
    const { rooms, totalCount, hasNextPage } =
      await this.roomRepository.findAllBySearchRoomOption(searchOption);

    const endRoom = rooms.length > 0 ? rooms.at(-1) : undefined;
    const endCursor = endRoom
      ? cursorEncoder({ id: endRoom.id, createdAt: endRoom.createdAt })
      : undefined;

    return {
      edges: rooms.map((room) => ({
        cursor: cursorEncoder({ id: room.id, createdAt: room.createdAt }),
        node: room,
      })),
      nodes: rooms,
      pageInfo: {
        hasNextPage,
        endCursor,
      },
      totalCount,
    };
  }
}
