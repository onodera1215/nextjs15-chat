import { Injectable } from '@nestjs/common';
import { IRoomRepository } from '../room.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { fromPrismaRoomToRoomDomain } from './utis';
import { RoomDomain, RoomStatusEnum } from '../room.domain';
import { SearchRoomOptionInput } from '../models/search-room-option.input';
import { Prisma } from '@prisma/client';
import { CreateRoomDto } from '../dto/create-room.dto';

@Injectable()
export class RoomRepository implements IRoomRepository {
  constructor(private readonly prisma: PrismaService) {}
  async isNameAlreadyExists(name: string): Promise<boolean> {
    const room = await this.prisma.room.findFirst({
      where: { name, status: RoomStatusEnum.ACTIVE },
    });
    return !!room;
  }

  async createRoom(data: CreateRoomDto): Promise<RoomDomain> {
    const room = await this.prisma.room.create({
      data,
    });

    return fromPrismaRoomToRoomDomain(room);
  }
  async findAllBySearchRoomOption(
    searchOption?: SearchRoomOptionInput,
  ): Promise<RoomDomain[]> {
    const conditions: Prisma.RoomWhereInput[] = [];
    // ルーム名検索
    if (searchOption?.name) {
      conditions.push({ name: { contains: searchOption.name } });
    }
    // ルームID検索
    if (searchOption?.roomId) {
      conditions.push({ id: searchOption.roomId });
    }
    // ルーム作成日検索
    if (searchOption?.createdAt) {
      conditions.push({
        createdAt: searchOption.createdAt,
      });
    }
    // ルーム更新日検索
    if (searchOption?.updatedAt) {
      conditions.push({
        updatedAt: searchOption.updatedAt,
      });
    }
    const rooms = await this.prisma.room.findMany({
      where: {
        AND: [...conditions, { status: RoomStatusEnum.ACTIVE }],
      },
    });
    return rooms.map(fromPrismaRoomToRoomDomain);
  }

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
