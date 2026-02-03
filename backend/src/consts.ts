import { registerEnumType } from '@nestjs/graphql';

export enum RoomRole {
  ROOM_OWNER = 'room_owner',
  ROOM_MEMBER = 'room_member',
}

registerEnumType(RoomRole, {
  name: 'RoomRole',
});
