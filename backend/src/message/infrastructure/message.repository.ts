import { Injectable } from '@nestjs/common';
import { IMessageRepository } from '../message.repository.interface';
import { MessageDomain } from '../message.domain';
import { CreateMessageInput } from '../inputs/create-message.input';
import { SearchOptionInput } from '../inputs/search-option.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageRepository implements IMessageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMessage(data: CreateMessageInput): Promise<MessageDomain> {
    const message = await this.prismaService.message.create({
      data,
    });
    return new MessageDomain(message);
  }

  async getMessages(
    searchOptionInput: SearchOptionInput,
  ): Promise<MessageDomain[]> {
    const messages = await this.prismaService.message.findMany({
      where: {
        ...searchOptionInput,
      },
    });
    return messages.map((message) => new MessageDomain(message));
  }
}
