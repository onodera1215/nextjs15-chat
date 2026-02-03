import { RoomStatus } from '@prisma/client';
import { RoomStatusEnum } from 'src/room/room.domain';

export const fromPrismaRoomStatusEnumToDomainRoomStatusEnum = (
  status: RoomStatus,
): RoomStatusEnum => {
  switch (status) {
    case 'ACTIVE':
      return RoomStatusEnum.ACTIVE;
    case 'INACTIVE':
      return RoomStatusEnum.INACTIVE;
    default:
      throw new Error(`Unknown room status`);
  }
};
