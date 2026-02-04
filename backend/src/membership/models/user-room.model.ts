import { Field, ObjectType } from '@nestjs/graphql';
import { RoomRole } from 'src/consts';

@ObjectType()
export class UserRoomNode {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  roomId: string;

  @Field(() => RoomRole)
  role: string;

  @Field(() => Date)
  joinedAt: Date;

  @Field(() => String, { nullable: true })
  leftViaUserId?: string;
}
