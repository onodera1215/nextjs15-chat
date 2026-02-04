import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInvitationInput {
  @Field(() => String)
  roomId: string;

  @Field(() => String, {
    nullable: true,
    description: '招待を受け取るユーザーのメールアドレス',
  })
  inviteeEmail: string;

  @Field(() => ID)
  inviteeUserId: string;

  @Field(() => Date)
  expiresAt: Date;
}
