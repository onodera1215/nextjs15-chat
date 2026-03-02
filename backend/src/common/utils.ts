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

/**
 * cursorをデコードする関数
 * @param {string} encodedCursor
 * @returns {{ id: string; createdAt: Date }}
 */
export function cursorDecoder(encodedCursor: string): {
  id: string;
  createdAt: Date;
} {
  const decoded = Buffer.from(encodedCursor, 'base64').toString('utf-8');
  const parsed = JSON.parse(decoded) as { id: string; createdAt: string };
  return {
    id: parsed.id,
    createdAt: new Date(parsed.createdAt),
  };
}

/**
 * cursorをエンコードする関数
 * @param {{ id: string; createdAt: Date }} cursor
 * @returns {string}
 */
export function cursorEncoder(cursor: { id: string; createdAt: Date }): string {
  return Buffer.from(JSON.stringify(cursor)).toString('base64');
}
