import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IInvitationRepository } from '../invitation.repository.interface';
import { IMembershipRepository } from '../membership.repository.interface';
import { IRoomRepository } from 'src/room/room.repository.interface';
import { AcceptInvitationDto } from '../dto/accept-invitation.dto';
import { AcceptInvitationPayload } from '../models/accept-invitation.payload';
import { RoomRole } from 'src/consts';

@Injectable()
export class AcceptInvitationUsecase {
  constructor(
    @Inject('IInvitationRepository')
    private readonly invitationRepository: IInvitationRepository,

    @Inject('IMembershipRepository')
    private readonly membershipRepository: IMembershipRepository,

    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(
    acceptInvitationDto: AcceptInvitationDto,
  ): Promise<AcceptInvitationPayload> {
    const { invitationId, userId } = acceptInvitationDto;

    const invitation = await this.invitationRepository.findById(invitationId);
    if (!invitation) {
      throw new BadRequestException('招待が存在しません');
    }

    if (invitation.inviteeUserId !== userId) {
      throw new BadRequestException('この招待は利用できません');
    }

    if (invitation.usedAt) {
      throw new BadRequestException('この招待は既に使用されています');
    }

    if (invitation.expiresAt <= new Date()) {
      throw new BadRequestException('この招待の有効期限は切れています');
    }

    const room = await this.roomRepository.findById(invitation.roomId);
    if (!room) {
      throw new BadRequestException('ルームが存在しません');
    }

    const isMember = await this.membershipRepository.isAlreadyMember(
      invitation.roomId,
      userId,
    );
    if (isMember) {
      throw new BadRequestException('既にルームのメンバーです');
    }

    // 招待経由で参加した事実を membership 側に残しておくと、
    // 後続の監査や UI 表示で「誰の招待で参加したか」を辿れる。
    await this.membershipRepository.joinRoom(
      invitation.roomId,
      userId,
      RoomRole.ROOM_MEMBER,
      invitation.inviterUserId,
    );
    // 参加成功後に招待を使用済みに更新し、再利用を防ぐ。
    const usedInvitation = await this.invitationRepository.markUsed(invitationId);

    return {
      invitation: usedInvitation,
      room,
    };
  }
}
