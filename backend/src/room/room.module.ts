import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { RoomRepository } from './infrastructure/room.repository';
import { CreateRoomUsecase } from './usecase/create-room.usecase';
import { GetRoomsUsecase } from './usecase/get-rooms.usecase';

@Module({
  providers: [
    CreateRoomUsecase,
    GetRoomsUsecase,
    RoomResolver,
    {
      provide: 'IRoomRepository',
      useClass: RoomRepository,
    },
  ],
  exports: [CreateRoomUsecase, GetRoomsUsecase],
})
export class RoomModule {}
