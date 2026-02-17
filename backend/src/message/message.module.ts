import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { CreateMessageUsecase } from './usecase/create-message.usecase';
import { MessageRepository } from './infrastructure/message.repository';
import { RoomRepository } from 'src/room/infrastructure/room.repository';
import { GetRoomUsecase } from 'src/room/usecase/get-room.usecase';
import { GetUserUsecase } from 'src/user/usecase/get-user.usecase';
import { UserRepository } from 'src/user/infrastructure/user.repository';
import { SearchMessageUsecase } from './usecase/search-message.usecase';

@Module({
  providers: [
    SearchMessageUsecase,
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
  exports: [SearchMessageUsecase, CreateMessageUsecase],
})
export class MessageModule {}
