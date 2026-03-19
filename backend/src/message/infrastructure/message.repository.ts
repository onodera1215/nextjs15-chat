import { Injectable } from '@nestjs/common';
import {
  IMessageRepository,
  SearchMessagesDto,
} from '../message.repository.interface';
import { MessageDomain } from '../message.domain';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchMessagesInput } from '../models/search-messages.input';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Prisma } from '@prisma/client';
import { cursorDecoder } from 'src/common/utils';
import { PAGINATION_LIMIT } from 'src/common/config';

@Injectable()
export class MessageRepository implements IMessageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMessage(data: CreateMessageDto): Promise<MessageDomain> {
    const message = await this.prismaService.message.create({
      data,
    });
    return new MessageDomain(message);
  }

  async searchMessages(
    searchOptionInput: SearchMessagesInput,
  ): Promise<SearchMessagesDto> {
    const conditions: Prisma.MessageWhereInput[] = [];

    if (searchOptionInput.userId) {
      conditions.push({ senderId: searchOptionInput.userId });
    }

    if (searchOptionInput.roomId) {
      conditions.push({ roomId: searchOptionInput.roomId });
    }

    if (searchOptionInput.after) {
      const { id, createdAt } = cursorDecoder(searchOptionInput.after);
      conditions.push({
        createdAt: {
          gt: createdAt,
        },
        id: {
          gt: id,
        },
      });
    }

    const whereCondition: Prisma.MessageWhereInput = {
      AND: conditions,
    };

    const [totalCount, messages] = await this.prismaService.$transaction([
      this.prismaService.message.count({
        where: whereCondition,
      }),
      this.prismaService.message.findMany({
        where: whereCondition,
        orderBy: {
          createdAt: Prisma.SortOrder.asc,
        },
        take: PAGINATION_LIMIT + 1,
      }),
    ]);

    return {
      messages: messages
        .slice(0, PAGINATION_LIMIT)
        .map((message) => new MessageDomain(message)),
      totalCount,
      hasNextPage: messages.length > PAGINATION_LIMIT,
    };
  }
  async countUnreadMessages(
    roomId: string,
    userId: string,
    lastReadAt: Date,
  ): Promise<number> {
    return this.prismaService.message.count({
      where: {
        roomId,
        createdAt: {
          gt: lastReadAt,
        },
      },
    });
  }
}
