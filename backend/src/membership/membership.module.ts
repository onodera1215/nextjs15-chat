import { Module } from '@nestjs/common';
import { MembershipResolver } from './membership.resolver';
import { JoinRoomUsecase } from './usecase/join-room.usecase';
import { MembershipRepository } from './infrastructure/membership.repository';
import { RoomRepository } from 'src/room/infrastructure/room.repository';
import { MarkRoomReadUsecase } from './usecase/mark-room-read.usecase';
import { MessageRepository } from 'src/message/infrastructure/message.repository';
import { LeaveRoomUsecase } from './usecase/leave-room.usecase';
import { CreateInvitationUsecase } from './usecase/create-invitation.usecase';
import { InvitationRepository } from './infrastructure/invitation.repository';

@Module({
  providers: [
    MembershipResolver,
    JoinRoomUsecase,
    MarkRoomReadUsecase,
    LeaveRoomUsecase,
    CreateInvitationUsecase,
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
    {
      provide: 'IInvitationRepository',
      useClass: InvitationRepository,
    },
  ],
})
export class MembershipModule {}
