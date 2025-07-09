import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageInput } from '../inputs/create-message.input';
import { IMessageRepository } from '../message.repository.interface';

@Injectable()
export class CreateMessageUsecase {
  constructor(
    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
  ) {}

  async execute(createMessageInput: CreateMessageInput) {
    return await this.messageRepository.createMessage(createMessageInput);
  }
}
