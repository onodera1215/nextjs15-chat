import { PrismaService } from 'src/prisma/prisma.service';
import { JoinRoomPayload } from '../models/join-room.payload';
import { RoomRole } from 'src/consts';
import { fromPrismaRoomStatusEnumToDomainRoomStatusEnum } from 'src/common/utils';
import { IMembershipRepository } from '../membership.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MembershipRepository implements IMembershipRepository {
  constructor(private readonly prisma: PrismaService) {}
  async isAlreadyMember(roomId: string, userId: string): Promise<boolean> {
    const relation = await this.prisma.userRoom.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
    return relation !== null;
  }
  async joinRoom(
    roomId: string,
    userId: string,
    roomRoleId: RoomRole,
  ): Promise<JoinRoomPayload> {
    const membership = await this.prisma.userRoom.create({
      data: { roomId, userId, roomRoleId },
    });
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (room && user) {
      return {
        membership: {
          ...membership,
          role: roomRoleId,
          joinedAt: membership.createdAt,
        },
        room: {
          ...room,
          status: fromPrismaRoomStatusEnumToDomainRoomStatusEnum(room.status),
        },
      };
    }
    throw new Error('ルームの参加に失敗しました');
  }
}
