import { IsNotEmpty } from 'class-validator';
import { RoomRole } from 'src/consts';

export class JoinRoomDto {
  @IsNotEmpty()
  roomId: string;

  invitationToken?: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  roomRoleId: RoomRole;
}
