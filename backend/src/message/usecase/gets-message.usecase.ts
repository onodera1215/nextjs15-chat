import { Inject, Injectable } from '@nestjs/common';
import { SearchOptionInput } from '../inputs/search-option.input';
import { IMessageRepository } from '../message.repository.interface';

@Injectable()
export class GetsMessageUsecase {
  constructor(
    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
  ) {}

  async execute(searchOptionInput: SearchOptionInput) {
    return this.messageRepository.getMessages(searchOptionInput);
  }
}
