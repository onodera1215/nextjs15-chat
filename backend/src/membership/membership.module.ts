import { Module } from '@nestjs/common';
import { MembershipResolver } from './membership.resolver';
import { JoinRoomUsecase } from './usecase/join-room.usecase';
import { MembershipRepository } from './infrastructure/membership.repository';
import { RoomRepository } from 'src/room/infrastructure/room.repository';
import { MarkRoomReadUsecase } from './usecase/mark-room-read.usecase';
import { MessageRepository } from 'src/message/infrastructure/message.repository';
import { LeaveRoomUsecase } from './usecase/leave-room.usecase';

@Module({
  providers: [
    MembershipResolver,
    JoinRoomUsecase,
    MarkRoomReadUsecase,
    LeaveRoomUsecase,
    {
      provide: 'IMembershipRepository',
      useClass: MembershipRepository,
    },
    {
      provide: 'IRoomRepository',
      useClass: RoomRepository,
    },
    {
      provide: 'IMessageRepository',
      useClass: MessageRepository,
    },
  ],
})
export class MembershipModule {}
