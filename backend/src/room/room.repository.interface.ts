import { CreateRoomInput } from './gql-model/room.input';
import { RoomDomain } from './room.domain';
import { SearchRoomOptionInput } from './gql-model/search-room-option.input';

export interface IRoomRepository {
  createRoom(input: CreateRoomInput): Promise<RoomDomain>;
  isNameAlreadyExists(name: string): Promise<boolean>;
  findAllBySearchRoomOption(
    searchOption: SearchRoomOptionInput,
  ): Promise<RoomDomain[]>;
}
