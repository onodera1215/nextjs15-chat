import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInvitationInput {
  @Field(() => String)
  roomId: string;

  @Field(() => String)
  inviteeUserId: string;

  @Field(() => String, { nullable: true })
  email?: string;
}
