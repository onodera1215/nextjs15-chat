import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MarkRoomReadEdge {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  roomId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Date)
  lastReadAt: Date;
}
