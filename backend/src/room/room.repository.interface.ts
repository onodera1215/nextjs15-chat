import { CreateRoomInput } from './gql-model/room.input';
import { RoomNode } from './gql-model/room.model';

export interface IRoomRepository {
  createRoom(input: CreateRoomInput): Promise<RoomNode>;
}
