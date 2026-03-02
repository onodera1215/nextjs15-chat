import { Injectable } from '@nestjs/common';
import {
  FindAllBySearchRoomOptionDto,
  IRoomRepository,
} from '../room.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { fromPrismaRoomToRoomDomain } from './utis';
import { RoomDomain, RoomStatusEnum } from '../room.domain';
import { SearchRoomOptionInput } from '../models/search-room-option.input';
import { Prisma } from '@prisma/client';
import { CreateRoomDto } from '../dto/create-room.dto';
import { PAGINATION_LIMIT } from 'src/common/config';
import { cursorDecoder } from 'src/common/utils';

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
  ): Promise<FindAllBySearchRoomOptionDto> {
    const conditions: Prisma.RoomWhereInput[] = [];
    // ユーザーID検索
    if (searchOption?.userId) {
      conditions.push({
        userRooms: {
          some: {
            user: {
              id: searchOption.userId,
            },
          },
        },
      });
    }

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
    // afterを取得
    if (searchOption?.after) {
      const decodedCursor = cursorDecoder(searchOption.after);
      conditions.push({
        AND: [
          { createdAt: { gt: decodedCursor.createdAt } },
          { id: { gt: decodedCursor.id } },
        ],
      });
    }
    // 条件
    const whereCondition: Prisma.RoomWhereInput = {
      AND: [...conditions, { status: RoomStatusEnum.ACTIVE }],
    };

    const [totalCount, rooms] = await this.prisma.$transaction([
      this.prisma.room.count({
        where: whereCondition,
      }),
      this.prisma.room.findMany({
        where: whereCondition,
        orderBy: {
          createdAt: Prisma.SortOrder.asc,
        },
        take: PAGINATION_LIMIT + 1, // 次ページの有無を確認するために、limit + 1件取得する
      }),
    ]);

    return {
      rooms: rooms.slice(0, PAGINATION_LIMIT).map(fromPrismaRoomToRoomDomain),
      totalCount,
      hasNextPage: rooms.length > PAGINATION_LIMIT, // 取得した件数がlimitを超えている場合は、次ページが存在する
    };
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
