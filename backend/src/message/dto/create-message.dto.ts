import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  senderId: string;
}
