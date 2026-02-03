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

@Resolver()
export class MembershipResolver {
  constructor(private readonly joinRoomUsecase: JoinRoomUsecase) {}

  @Mutation(() => JoinRoomPayload, { description: 'ルーム参加' })
  async joinRoom(
    @Args('input') input: JoinRoomInput,
    @CurrentPayload() user: JwtPayload,
  ): Promise<JoinRoomPayload> {
    // user.subが無い場合はGuardで弾かれる想定なのでここではチェックしない
    return this.joinRoomUsecase.execute({ ...input, userId: user.sub! });
  }

  @Mutation(() => LeaveRoomPayload, { description: 'ルームメンバー退会' })
  async leaveRoom(
    @Args('input') input: LeaveRoomInput,
    @CurrentPayload() user: JwtPayload,
  ): Promise<LeaveRoomPayload> {
    throw new Error('Not implemented yet');
  }

  @Mutation(() => MarkRoomReadPayload, { description: '既読処理実行' })
  async markRoomRead(
    @Args('input') input: MarkRoomReadInput,
    @CurrentPayload() user: JwtPayload,
  ): Promise<MarkRoomReadPayload> {
    throw new Error('Not implemented yet');
  }

  @Mutation(() => CreateInvitationPayload, { description: '招待トークン発行' })
  async createInvitation(
    @Args('input') input: CreateInvitationInput,
    @CurrentPayload() user: JwtPayload,
  ): Promise<CreateInvitationPayload> {
    throw new Error('Not implemented yet');
  }
}
