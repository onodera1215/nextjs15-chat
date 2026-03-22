import { IsNotEmpty } from 'class-validator';

export class AcceptInvitationDto {
  @IsNotEmpty()
  invitationId: string;

  @IsNotEmpty()
  userId: string;
}
