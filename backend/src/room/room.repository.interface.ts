import { RoomDomain } from './room.domain';
import { SearchRoomOptionInput } from './models/search-room-option.input';
import { CreateRoomDto } from './dto/create-room.dto';

export interface IRoomRepository {
  createRoom(input: CreateRoomDto): Promise<RoomDomain>;
  isNameAlreadyExists(name: string): Promise<boolean>;
  findById(id: string): Promise<RoomDomain | null>;
  findAllBySearchRoomOption(
    searchOption?: SearchRoomOptionInput,
  ): Promise<RoomDomain[]>;
}
