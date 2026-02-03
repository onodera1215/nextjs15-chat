import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from '../message.repository.interface';
import { CreateMessageInput } from '../models/create-message.input';
import { JwtPayload } from 'src/types';
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
