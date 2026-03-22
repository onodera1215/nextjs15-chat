import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IMembershipRepository } from '../membership.repository.interface';
import { IRoomRepository } from 'src/room/room.repository.interface';
import { CreateInvitationDto } from '../dto/create-invitation.dto';
import { CreateInvitationPayload } from '../models/create-invitation.payload';
import { IInvitationRepository } from '../invitation.repository.interface';
import { dayjs } from 'src/common/utils';

@Injectable()
export class CreateInvitationUsecase {
  constructor(
    @Inject('IInvitationRepository')
    private readonly invitationRepository: IInvitationRepository,

    @Inject('IMembershipRepository')
    private readonly membershipRepository: IMembershipRepository,

    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}
  async execute(
    createInvitationDto: CreateInvitationDto,
  ): Promise<CreateInvitationPayload> {
    const { roomId, inviteeUserId, inviterUserId } = createInvitationDto;

    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new BadRequestException('ルームが存在しません');
    }

    const isInviterMember = await this.membershipRepository.isAlreadyMember(
      roomId,
      inviterUserId,
    );
    if (!isInviterMember) {
      throw new BadRequestException('招待を作成する権限がありません');
    }

    const isMember = await this.membershipRepository.isAlreadyMember(
      roomId,
      inviteeUserId,
    );
    if (isMember) {
      throw new BadRequestException('既にルームのメンバーです');
    }

    if (inviterUserId === inviteeUserId) {
      throw new BadRequestException('自分自身は招待できません');
    }

    const activeInvitation =
      await this.invitationRepository.findActiveByRoomAndInvitee(
        roomId,
        inviteeUserId,
      );
    if (activeInvitation) {
      throw new BadRequestException('未使用の招待が既に存在します');
    }

    // 有効期限
    const expiresAt = dayjs().add(3, 'day').toDate();

    const invitation = await this.invitationRepository.create(
      createInvitationDto,
      expiresAt,
    );

    return { invitation };
  }
}
