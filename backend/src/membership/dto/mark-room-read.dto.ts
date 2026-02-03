import { IsNotEmpty } from 'class-validator';

export class MarkRoomReadDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  userId: string;
}
