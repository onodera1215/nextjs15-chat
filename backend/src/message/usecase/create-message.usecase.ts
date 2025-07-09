import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from '../message.repository.interface';
import { CreateMessageInput } from '../models/create-message.input';

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
