import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IInvitationRepository } from '../invitation.repository.interface';
import { CreateInvitationDto } from '../dto/create-invitation.dto';
import { InvitationNode } from '../models/invitation.model';

@Injectable()
export class InvitationRepository implements IInvitationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateInvitationDto,
    expiresAt: Date,
  ): Promise<InvitationNode> {
    const invitation = await this.prisma.invitation.create({
      data: {
        ...dto,
        expiresAt,
      },
    });
    return {
      ...invitation,
      inviteeUserId: invitation.inviteeUserId,
    };
  }
}
