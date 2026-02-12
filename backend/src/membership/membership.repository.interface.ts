import { RoomRole } from 'src/consts';
import { JoinRoomPayload } from './models/join-room.payload';
import { UserRoomNode } from './models/user-room.model';
import { MarkRoomReadEdge } from './models/mark-room-read.edge';

export interface IMembershipRepository {
  isAlreadyMember(roomId: string, userId: string): Promise<boolean>;
  joinRoom(
    roomId: string,
    userId: string,
    roomRoleId: RoomRole,
  ): Promise<JoinRoomPayload>;
  leaveRoom(roomId: string, userId: string): Promise<UserRoomNode>;
  upsertLastReadAt(roomId: string, userId: string): Promise<MarkRoomReadEdge>;
}
