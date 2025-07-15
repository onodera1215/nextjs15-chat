import { Injectable } from '@nestjs/common';
import { IRoomRepository } from '../room.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { fromPrismaRoomToRoomDomain } from './utis';
import { RoomDomain, RoomStatusEnum } from '../room.domain';

@Injectable()
export class RoomRepository implements IRoomRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<RoomDomain | null> {
    const room = await this.prisma.room.findFirst({
      where: { id, status: RoomStatusEnum.ACTIVE },
    });
    if (!room) {
      return null;
    }
    return fromPrismaRoomToRoomDomain(room);
  }
}
