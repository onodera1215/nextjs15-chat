import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from '../message.repository.interface';
import { SearchMessagesInput } from '../models/search-messages.input';

@Injectable()
export class GetsMessageUsecase {
  constructor(
    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
  ) {}

  async execute(searchOptionInput: SearchMessagesInput) {
    return this.messageRepository.getMessages(searchOptionInput);
  }
}
