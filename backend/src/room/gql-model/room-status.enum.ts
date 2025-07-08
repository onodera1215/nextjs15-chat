import { registerEnumType } from '@nestjs/graphql';

export enum RoomStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

registerEnumType(RoomStatusEnum, {
  name: 'RoomStatusEnum',
  description: 'ルームステータス',
});
