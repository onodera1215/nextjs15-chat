import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JoinRoomPayload } from '../models/join-room.payload';
import { IMembershipRepository } from '../membership.repository.interface';
import { IRoomRepository } from 'src/room/room.repository.interface';
import { JoinRoomDto } from '../dto/join-room.dto';

@Injectable()
export class JoinRoomUsecase {
  constructor(
    @Inject('IMembershipRepository')
    private readonly membershipRepository: IMembershipRepository,

    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}
  async execute(joinRoomDto: JoinRoomDto): Promise<JoinRoomPayload> {
    const { roomId, userId, roomRoleId } = joinRoomDto;

    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new BadRequestException('ルームが存在しません');
    }

    const isMember = await this.membershipRepository.isAlreadyMember(
      roomId,
      userId,
    );
    if (isMember) {
      throw new BadRequestException('既にルームのメンバーです');
    }

    return this.membershipRepository.joinRoom(roomId, userId, roomRoleId);
  }
}
