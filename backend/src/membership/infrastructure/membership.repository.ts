import { PrismaService } from 'src/prisma/prisma.service';
import { JoinRoomPayload } from '../models/join-room.payload';
import { RoomRole } from 'src/consts';
import {
  dayjs,
  fromPrismaRoomStatusEnumToDomainRoomStatusEnum,
} from 'src/common/utils';
import { IMembershipRepository } from '../membership.repository.interface';
import { Injectable } from '@nestjs/common';
import { UserRoomNode } from '../models/user-room.model';
import { MarkRoomReadEdge } from '../models/mark-room-read.edge';

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
  async leaveRoom(roomId: string, userId: string): Promise<UserRoomNode> {
    const userRoom = await this.prisma.userRoom.delete({
      where: { roomId_userId: { roomId, userId } },
    });
    return {
      ...userRoom,
      joinedAt: userRoom.createdAt,
      role: userRoom.roomRoleId,
    };
  }
  async upsertLastReadAt(
    roomId: string,
    userId: string,
  ): Promise<MarkRoomReadEdge> {
    const now = dayjs().toDate();
    const updatedUserRoom = await this.prisma.roomRead.upsert({
      where: { roomId_userId: { roomId, userId } },
      update: { lastReadAt: now },
      create: {
        roomId,
        userId,
        lastReadAt: now,
      },
    });
    return {
      id: updatedUserRoom.id,
      roomId: updatedUserRoom.roomId,
      userId: updatedUserRoom.userId,
      lastReadAt: updatedUserRoom.lastReadAt,
    };
  }
}
