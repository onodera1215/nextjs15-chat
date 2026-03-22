import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IInvitationRepository } from '../invitation.repository.interface';
import { CreateInvitationDto } from '../dto/create-invitation.dto';
import { InvitationNode } from '../models/invitation.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class InvitationRepository implements IInvitationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toInvitationNode(
    invitation: Prisma.InvitationGetPayload<{
      include: {
        room: true;
        inviterUser: true;
      };
    }>,
  ): InvitationNode {
    return {
      ...invitation,
      inviteeUserId: invitation.inviteeUserId,
      roomName: invitation.room.name,
      inviterName: invitation.inviterUser.name,
    };
  }

  async create(
    dto: CreateInvitationDto,
    expiresAt: Date,
  ): Promise<InvitationNode> {
    const invitation = await this.prisma.invitation.create({
      data: {
        ...dto,
        expiresAt,
      },
      include: {
        room: true,
        inviterUser: true,
      },
    });
    return this.toInvitationNode(invitation);
  }

  async findActiveByRoomAndInvitee(
    roomId: string,
    inviteeUserId: string,
  ): Promise<InvitationNode | null> {
    const invitation = await this.prisma.invitation.findFirst({
      where: {
        roomId,
        inviteeUserId,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        room: true,
        inviterUser: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return invitation ? this.toInvitationNode(invitation) : null;
  }

  async findPendingByInviteeUserId(
    inviteeUserId: string,
  ): Promise<InvitationNode[]> {
    const invitations = await this.prisma.invitation.findMany({
      where: {
        inviteeUserId,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        room: true,
        inviterUser: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return invitations.map((invitation) => this.toInvitationNode(invitation));
  }

  async findById(invitationId: string): Promise<InvitationNode | null> {
    const invitation = await this.prisma.invitation.findUnique({
      where: {
        id: invitationId,
      },
      include: {
        room: true,
        inviterUser: true,
      },
    });

    return invitation ? this.toInvitationNode(invitation) : null;
  }

  async markUsed(invitationId: string): Promise<InvitationNode> {
    const invitation = await this.prisma.invitation.update({
      where: {
        id: invitationId,
      },
      data: {
        usedAt: new Date(),
      },
      include: {
        room: true,
        inviterUser: true,
      },
    });

    return this.toInvitationNode(invitation);
  }
}
