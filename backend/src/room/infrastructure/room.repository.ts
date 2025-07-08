import { Injectable } from '@nestjs/common';
import { IRoomRepository } from '../room.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomInput } from '../gql-model/room.input';
import { RoomNode } from '../gql-model/room.model';
import { fromPrismaRoomToRoomNode } from './utis';

@Injectable()
export class RoomRepository implements IRoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(input: CreateRoomInput): Promise<RoomNode> {
    const room = await this.prisma.room.create({
      data: {
        ...input,
      },
    });

    return fromPrismaRoomToRoomNode(room);
  }
}
