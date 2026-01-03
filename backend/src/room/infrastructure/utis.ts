import { Room } from '@prisma/client';
import { RoomStatusEnum } from '../gql-model/room-status.enum';
import { RoomDomain } from '../room.domain';

export function fromPrismaRoomToRoomDomain(room: Room): RoomDomain {
  return new RoomDomain({
    ...room,
    status: RoomStatusEnum[room.status as keyof typeof RoomStatusEnum],
  });
}
