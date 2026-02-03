import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IMembershipRepository } from '../membership.repository.interface';
import { IRoomRepository } from 'src/room/room.repository.interface';
import { MarkRoomReadDto } from '../dto/mark-room-read.dto';
import { IMessageRepository } from 'src/message/message.repository.interface';
import { MarkRoomReadPayload } from '../models/mark-room-read.payload';

@Injectable()
export class MarkRoomReadUsecase {
  constructor(
    @Inject('IMembershipRepository')
    private readonly membershipRepository: IMembershipRepository,

    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,

    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
  ) {}
  async execute(
    markRoomReadDto: MarkRoomReadDto,
  ): Promise<MarkRoomReadPayload> {
    const { roomId, userId } = markRoomReadDto;

    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new BadRequestException('ルームが存在しません');
    }

    const isMember = await this.membershipRepository.isAlreadyMember(
      roomId,
      userId,
    );
    if (!isMember) {
      throw new BadRequestException('メンバーではありません');
    }

    const userRoomNode = await this.membershipRepository.upsertLastReadAt(
      roomId,
      userId,
    );

    if (!userRoomNode) {
      throw new BadRequestException('既読情報の更新に失敗しました');
    }

    const unreadCount = await this.messageRepository.countUnreadMessages(
      roomId,
      userId,
      userRoomNode.lastReadAt,
    );

    return {
      readState: {
        roomId,
        userId,
        lastReadAt: userRoomNode.lastReadAt,
        unreadCount,
      },
    };
  }
}
