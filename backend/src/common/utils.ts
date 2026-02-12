import { RoomStatus } from '@prisma/client';
import { RoomStatusEnum } from 'src/room/room.domain';
import * as Dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

export const fromPrismaRoomStatusEnumToDomainRoomStatusEnum = (
  status?: RoomStatus,
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

Dayjs.locale(ja);
export const dayjs = Dayjs;
