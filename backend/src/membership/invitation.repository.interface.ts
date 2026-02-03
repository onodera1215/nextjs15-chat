import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationNode } from './models/invitation.model';

export interface IInvitationRepository {
  create(dto: CreateInvitationDto, expiresAt: Date): Promise<InvitationNode>;
}
