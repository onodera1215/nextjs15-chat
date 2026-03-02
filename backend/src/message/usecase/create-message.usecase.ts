import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from '../message.repository.interface';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class CreateMessageUsecase {
  constructor(
    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
  ) {}

  async execute(createMessageDto: CreateMessageDto) {
    return await this.messageRepository.createMessage({
      ...createMessageDto,
    });
  }
}
