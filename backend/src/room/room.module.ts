import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { RoomRepository } from './infrastructure/room.repository';
import { CreateRoomUsecase } from './usecase/create-room.usecase';

@Module({
  providers: [
    CreateRoomUsecase,
    RoomResolver,
    {
      provide: 'IRoomRepository',
      useClass: RoomRepository,
    },
  ],
  exports: [CreateRoomUsecase],
})
export class RoomModule {}
