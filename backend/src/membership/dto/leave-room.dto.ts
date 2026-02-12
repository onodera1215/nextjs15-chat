import { IsNotEmpty } from 'class-validator';

export class LeaveRoomDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  userId: string;
}
