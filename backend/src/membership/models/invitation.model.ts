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

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => Date)
  expiresAt: Date;

  @Field(() => Date, { nullable: true })
  usedAt: Date | null;

  @Field(() => Date)
  createdAt: Date;
}
