import { Field, ObjectType } from '@nestjs/graphql';
import { UserRoomNode } from './user-room.model';

@ObjectType()
export class UserRoomEdge {
  @Field(() => String)
  cursor: string;

  @Field(() => UserRoomNode)
  node: UserRoomNode;
}
