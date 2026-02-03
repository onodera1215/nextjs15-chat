import { Module } from '@nestjs/common';
import { MembershipResolver } from './membership.resolver';
import { JoinRoomUsecase } from './usecase/join-room.usecase';
import { MembershipRepository } from './infrastructure/membership.repository';
import { RoomRepository } from 'src/room/infrastructure/room.repository';

@Module({
  providers: [
    MembershipResolver,
    JoinRoomUsecase,
    {
      provide: 'IMembershipRepository',
      useClass: MembershipRepository,
    },
    {
      provide: 'IRoomRepository',
      useClass: RoomRepository,
    },
  ],
})
export class MembershipModule {}
