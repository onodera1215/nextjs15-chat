import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateInvitationPayload {
  @Field(() => String)
  roomId: string;

  @Field(() => ID, { description: '招待したユーザーのユーザーID' })
  inviteeUserId: string;

  @Field(() => String, {
    nullable: true,
    description: '招待を受け取るユーザーのメールアドレス',
  })
  inviteeEmail?: string;

  @Field(() => Date)
  expiresAt: Date;
}
