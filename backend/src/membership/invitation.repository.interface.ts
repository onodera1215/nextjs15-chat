import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationNode } from './models/invitation.model';

export interface IInvitationRepository {
  create(dto: CreateInvitationDto, expiresAt: Date): Promise<InvitationNode>;
  findActiveByRoomAndInvitee(
    roomId: string,
    inviteeUserId: string,
  ): Promise<InvitationNode | null>;
  findPendingByInviteeUserId(inviteeUserId: string): Promise<InvitationNode[]>;
  findById(invitationId: string): Promise<InvitationNode | null>;
  markUsed(invitationId: string): Promise<InvitationNode>;
}
