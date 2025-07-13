import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageNode {
  @Field(() => String)
  id: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  roomId: string;

  @Field(() => String)
  senderId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
