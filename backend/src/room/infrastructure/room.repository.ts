import { Injectable } from '@nestjs/common';
import { IRoomRepository } from '../room.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomInput } from '../gql-model/room.input';
import { fromPrismaRoomToRoomDomain } from './utis';
import { RoomDomain, RoomStatusEnum } from '../room.domain';

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
}
