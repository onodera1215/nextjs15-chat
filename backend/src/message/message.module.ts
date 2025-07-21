import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { CreateMessageUsecase } from './usecase/create-message.usecase';
import { GetsMessageUsecase } from './usecase/gets-message.usecase';
import { MessageRepository } from './infrastructure/message.repository';
import { RoomRepository } from 'src/room/infrastructure/room.repository';
import { GetRoomUsecase } from 'src/room/usecase/get-room.usecase';
import { GetUserUsecase } from 'src/user/usecase/get-user.usecase';
import { UserRepository } from 'src/user/infrastructure/user.repository';

@Module({
  providers: [
    GetsMessageUsecase,
    CreateMessageUsecase,
    MessageResolver,
    GetRoomUsecase,
    GetUserUsecase,
    {
      provide: 'IMessageRepository',
      useClass: MessageRepository,
    },
    {
      provide: 'IRoomRepository',
      useClass: RoomRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [GetsMessageUsecase, CreateMessageUsecase],
})
export class MessageModule {}
