import { registerEnumType } from '@nestjs/graphql';
import { RoomStatusEnum } from '../room.domain';

registerEnumType(RoomStatusEnum, {
  name: 'RoomStatusEnum',
  description: 'ルームステータス',
});

export { RoomStatusEnum };
