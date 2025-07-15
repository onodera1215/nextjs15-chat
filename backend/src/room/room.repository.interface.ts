import { RoomDomain } from './room.domain';

export interface IRoomRepository {
  findById(id: string): Promise<RoomDomain | null>;
}
