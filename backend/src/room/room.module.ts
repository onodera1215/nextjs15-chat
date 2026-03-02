import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { RoomRepository } from './infrastructure/room.repository';
import { CreateRoomUsecase } from './usecase/create-room.usecase';
import { GetRoomUsecase } from './usecase/get-room.usecase';
import { SearchRoomsUsecase } from './usecase/search-rooms.usecase';

@Module({
  providers: [
    CreateRoomUsecase,
    GetRoomUsecase,
    SearchRoomsUsecase,
    RoomResolver,
    {
      provide: 'IRoomRepository',
      useClass: RoomRepository,
    },
  ],
  exports: [CreateRoomUsecase, GetRoomUsecase, SearchRoomsUsecase],
})
export class RoomModule {}
