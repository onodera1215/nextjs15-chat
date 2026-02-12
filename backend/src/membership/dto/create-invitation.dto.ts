import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  inviterUserId: string;

  @IsNotEmpty()
  inviteeUserId: string;

  @IsEmail()
  email?: string;
}
