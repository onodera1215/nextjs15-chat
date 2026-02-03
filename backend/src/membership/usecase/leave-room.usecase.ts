import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IMembershipRepository } from '../membership.repository.interface';
import { IRoomRepository } from 'src/room/room.repository.interface';
import { LeaveRoomDto } from '../dto/leave-room.dto';
import { LeaveRoomPayload } from '../models/leave-room.payload';

@Injectable()
export class LeaveRoomUsecase {
  constructor(
    @Inject('IMembershipRepository')
    private readonly membershipRepository: IMembershipRepository,

    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}
  async execute(leaveRoomDto: LeaveRoomDto): Promise<LeaveRoomPayload> {
    const { roomId, userId } = leaveRoomDto;

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

    await this.membershipRepository.leaveRoom(roomId, userId);
    return {
      room,
    };
  }
}
