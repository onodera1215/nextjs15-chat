import { Room } from 'prisma/generated';
import { RoomNode } from '../gql-model/room.model';
import { RoomStatusEnum } from '../gql-model/room-status.enum';

export function fromPrismaRoomToRoomNode(room: Room): RoomNode {
  return {
    ...room,
    status: RoomStatusEnum[room.status as keyof typeof RoomStatusEnum],
  };
}
