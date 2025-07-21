import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from '../message.repository.interface';
import { SearchOptionInput } from '../models/search-option.input';

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
