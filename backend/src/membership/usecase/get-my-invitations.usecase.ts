import { Inject, Injectable } from '@nestjs/common';
import { IInvitationRepository } from '../invitation.repository.interface';
import { InvitationNode } from '../models/invitation.model';

@Injectable()
export class GetMyInvitationsUsecase {
  constructor(
    @Inject('IInvitationRepository')
    private readonly invitationRepository: IInvitationRepository,
  ) {}

  async execute(userId: string): Promise<InvitationNode[]> {
    return this.invitationRepository.findPendingByInviteeUserId(userId);
  }
}
