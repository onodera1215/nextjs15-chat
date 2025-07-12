import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { RoomRepository } from './infrastructure/room.repository';
import { CreateRoomUsecase } from './usecase/create-room.usecase';
import { GetRoomUsecase } from './usecase/get-room.usecase';
import { GetRoomsUsecase } from './usecase/get-rooms.usecase';

@Module({
  providers: [
    CreateRoomUsecase,
    GetRoomUsecase,
    GetRoomsUsecase,
    RoomResolver,
    {
      provide: 'IRoomRepository',
      useClass: RoomRepository,
    },
  ],
  exports: [CreateRoomUsecase, GetRoomUsecase, GetRoomsUsecase],
})
export class RoomModule {}
