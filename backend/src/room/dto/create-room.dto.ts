import { RoomStatusEnum } from '../room.domain';

export class CreateRoomDto {
  name: string;

  description: string;

  status: RoomStatusEnum;

  createdByUserId: string;
}
