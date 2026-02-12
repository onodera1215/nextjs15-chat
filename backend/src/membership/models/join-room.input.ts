import { Field, InputType } from '@nestjs/graphql';
import { RoomRole } from 'src/consts';

@InputType()
export class JoinRoomInput {
  @Field(() => String)
  roomId: string;

  @Field(() => String, { nullable: true, description: '招待経由の場合に使う' })
  invitationToken?: string;

  @Field(() => RoomRole)
  roomRoleId: RoomRole;
}
