import { CreateRoomInput } from './gql-model/room.input';
import { RoomDomain } from './room.domain';

export interface IRoomRepository {
  createRoom(input: CreateRoomInput): Promise<RoomDomain>;
  isNameAlreadyExists(name: string): Promise<boolean>;
}
