import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from '../message.repository.interface';
import { SearchMessagesInput } from '../models/search-messages.input';
import { MessageConnection } from '../models/message.connection';

@Injectable()
export class SearchMessageUsecase {
  constructor(
    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
  ) {}

  async execute(
    searchOptionInput: SearchMessagesInput,
  ): Promise<MessageConnection> {
    return await this.messageRepository.getMessages(searchOptionInput);
  }
}
