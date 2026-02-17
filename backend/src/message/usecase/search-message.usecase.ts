import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from '../message.repository.interface';
import { SearchMessagesInput } from '../models/search-messages.input';
import { MessageConnection } from '../models/message.connection';
import { cursorEncoder } from 'src/common/utils';

@Injectable()
export class SearchMessageUsecase {
  constructor(
    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
  ) {}

  async execute(
    searchOptionInput: SearchMessagesInput,
  ): Promise<MessageConnection> {
    const { messages, totalCount, hasNextPage } =
      await this.messageRepository.searchMessages(searchOptionInput);

    const endMessage = messages.length > 0 ? messages.at(-1) : undefined;
    const endCursor = endMessage
      ? cursorEncoder({ id: endMessage.id, createdAt: endMessage.createdAt })
      : undefined;

    return {
      edges: messages.map((message) => ({
        cursor: cursorEncoder({ id: message.id, createdAt: message.createdAt }),
        node: message,
      })),
      nodes: messages,
      pageInfo: {
        hasNextPage,
        endCursor,
      },
      totalCount,
    };
  }
}
