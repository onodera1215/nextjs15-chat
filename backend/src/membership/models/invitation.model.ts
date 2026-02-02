import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvitationNode {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  roomId: string;

  @Field(() => ID)
  inviterUserId: string;

  @Field(() => ID)
  inviteeUserId: string;

  @Field(() => String)
  email: string;

  @Field(() => Date)
  expiresAt: Date;

  @Field(() => Date)
  usedAt: Date;

  @Field(() => Date)
  createdAt: Date;
}
