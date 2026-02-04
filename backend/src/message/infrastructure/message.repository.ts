import { Injectable } from '@nestjs/common';
import { IMessageRepository } from '../message.repository.interface';
import { MessageDomain } from '../message.domain';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchMessagesInput } from '../models/search-messages.input';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class MessageRepository implements IMessageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMessage(data: CreateMessageDto): Promise<MessageDomain> {
    const message = await this.prismaService.message.create({
      data,
    });
    return new MessageDomain(message);
  }

  async getMessages(
    searchOptionInput: SearchMessagesInput,
  ): Promise<MessageDomain[]> {
    const messages = await this.prismaService.message.findMany({
      where: {
        ...searchOptionInput,
      },
    });
    return messages.map((message) => new MessageDomain(message));
  }
}
