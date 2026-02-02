import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JoinRoomInput {
  @Field(() => String)
  roomId: string;

  @Field(() => String, { nullable: true, description: '招待経由の場合に使う' })
  invitationToken?: string;
}
