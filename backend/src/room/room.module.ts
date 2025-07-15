import { Module } from '@nestjs/common';
import { RoomRepository } from './infrastructure/room.repository';
import { GetRoomUsecase } from './usecase/get-room.usecase';

@Module({
  providers: [
    GetRoomUsecase,
    {
      provide: 'IRoomRepository',
      useClass: RoomRepository,
    },
  ],
  exports: [GetRoomUsecase],
})
export class RoomModule {}
