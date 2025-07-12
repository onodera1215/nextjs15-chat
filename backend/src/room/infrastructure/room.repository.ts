import { Injectable } from '@nestjs/common';
import { IRoomRepository } from '../room.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomInput } from '../gql-model/room.input';
import { fromPrismaRoomToRoomDomain } from './utis';
import { RoomDomain, RoomStatusEnum } from '../room.domain';
import { SearchRoomOptionInput } from '../gql-model/search-room-option.input';
import { Prisma } from 'prisma/generated';

@Injectable()
export class RoomRepository implements IRoomRepository {
  constructor(private readonly prisma: PrismaService) {}
  async isNameAlreadyExists(name: string): Promise<boolean> {
    const room = await this.prisma.room.findFirst({
      where: { name, status: RoomStatusEnum.ACTIVE },
    });
    return !!room;
  }

  async createRoom(data: CreateRoomInput): Promise<RoomDomain> {
    const room = await this.prisma.room.create({
      data,
    });

    return fromPrismaRoomToRoomDomain(room);
  }
  async findAllBySearchRoomOption(
    searchOption: SearchRoomOptionInput,
  ): Promise<RoomDomain[]> {
    const conditions: Prisma.RoomWhereInput[] = [];
    // ルーム名検索
    if (searchOption.name) {
      conditions.push({ name: { contains: searchOption.name } });
    }
    // ルームID検索
    if (searchOption.roomId) {
      conditions.push({ id: searchOption.roomId });
    }
    // ルーム作成日検索
    if (searchOption.createdAt) {
      conditions.push({
        createdAt: searchOption.createdAt,
      });
    }
    // ルーム更新日検索
    if (searchOption.updatedAt) {
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
}
