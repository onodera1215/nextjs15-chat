import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from '../message.repository.interface';
import { CreateMessageInput } from '../models/create-message.input';
import { JwtPayload } from 'src/types';

@Injectable()
export class CreateMessageUsecase {
  constructor(
    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
  ) {}

  async execute(createMessageInput: CreateMessageInput, user: JwtPayload) {
    const senderId = user.sub;
    if (!senderId) {
      throw new BadRequestException('Invalid user payload: missing sub');
    }
    return await this.messageRepository.createMessage({
      ...createMessageInput,
      senderId,
    });
  }
}
