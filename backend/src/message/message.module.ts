import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { CreateMessageUsecase } from './usecase/create-message.usecase';
import { GetsMessageUsecase } from './usecase/gets-message.usecase';
import { MessageRepository } from './infrastructure/message.repository';

@Module({
  providers: [
    GetsMessageUsecase,
    CreateMessageUsecase,
    MessageResolver,
    {
      provide: 'IMessageRepository',
      useClass: MessageRepository,
    },
  ],
  exports: [GetsMessageUsecase, CreateMessageUsecase],
})
export class MessageModule {}
