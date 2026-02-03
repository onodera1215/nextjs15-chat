import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JoinRoomPayload } from './models/join-room.payload';
import { CurrentPayload } from 'src/auth/current-payload.decorator';
import { JwtPayload } from 'src/types';
import { JoinRoomInput } from './models/join-room.input';
import { LeaveRoomPayload } from './models/leave-room.payload';
import { LeaveRoomInput } from './models/leave-room.input';
import { MarkRoomReadInput } from './models/mark-room-read.input';
import { MarkRoomReadPayload } from './models/mark-room-read.payload';
import { CreateInvitationInput } from './models/create-invitation.input';
import { CreateInvitationPayload } from './models/create-invitation.payload';
import { JoinRoomUsecase } from './usecase/join-room.usecase';
import { LeaveRoomUsecase } from './usecase/leave-room.usecase';
import { MarkRoomReadUsecase } from './usecase/mark-room-read.usecase';
import { CreateInvitationUsecase } from './usecase/create-invitation.usecase';

@Resolver()
export class MembershipResolver {
  constructor(
    private readonly joinRoomUsecase: JoinRoomUsecase,
    private readonly leaveRoomUsecase: LeaveRoomUsecase,
    private readonly markRoomReadUsecase: MarkRoomReadUsecase,
    private readonly createInvitationUsecase: CreateInvitationUsecase,
  ) {}

  @Mutation(() => JoinRoomPayload, { description: 'ルーム参加' })
  async joinRoom(
    @Args('input') input: JoinRoomInput,
    @CurrentPayload() user: JwtPayload,
  ): Promise<JoinRoomPayload> {
    return this.joinRoomUsecase.execute({ ...input, userId: user.sub! });
  }

  @Mutation(() => LeaveRoomPayload, { description: 'ルームメンバー退会' })
  async leaveRoom(
    @Args('input') input: LeaveRoomInput,
    @CurrentPayload() user: JwtPayload,
  ): Promise<LeaveRoomPayload> {
    return await this.leaveRoomUsecase.execute({ ...input, userId: user.sub! });
  }

  @Mutation(() => MarkRoomReadPayload, { description: '既読処理実行' })
  async markRoomRead(
    @Args('input') input: MarkRoomReadInput,
    @CurrentPayload() user: JwtPayload,
  ): Promise<MarkRoomReadPayload> {
    return await this.markRoomReadUsecase.execute({
      ...input,
      userId: user.sub!,
    });
  }

  @Mutation(() => CreateInvitationPayload, {
    description: '招待用レコード作成',
  })
  async createInvitation(
    @Args('input') input: CreateInvitationInput,
    @CurrentPayload() user: JwtPayload,
  ): Promise<CreateInvitationPayload> {
    return await this.createInvitationUsecase.execute({
      ...input,
      inviterUserId: user.sub!,
    });
  }
}
