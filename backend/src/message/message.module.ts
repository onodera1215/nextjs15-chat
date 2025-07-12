import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { CreateMessageUsecase } from './usecase/create-message.usecase';
import { GetsMessageUsecase } from './usecase/gets-message.usecase';
import { MessageRepository } from './infrastructure/message.repository';
import { GetRoomsUsecase } from 'src/room/usecase/get-rooms.usecase';
import { RoomRepository } from 'src/room/infrastructure/room.repository';
import { GetRoomUsecase } from 'src/room/usecase/get-room.usecase';

@Module({
  providers: [
    GetsMessageUsecase,
    CreateMessageUsecase,
    MessageResolver,
    GetRoomUsecase,
    GetRoomsUsecase,
    {
      provide: 'IMessageRepository',
      useClass: MessageRepository,
    },
    {
      provide: 'IRoomRepository',
      useClass: RoomRepository,
    },
  ],
  exports: [GetsMessageUsecase, CreateMessageUsecase],
})
export class MessageModule {}
