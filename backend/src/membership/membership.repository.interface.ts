import { RoomRole } from 'src/consts';
import { JoinRoomPayload } from './models/join-room.payload';

export interface IMembershipRepository {
  isAlreadyMember(roomId: string, userId: string): Promise<boolean>;
  joinRoom(
    roomId: string,
    userId: string,
    roomRoleId: RoomRole,
  ): Promise<JoinRoomPayload>;
}
