import { Field, ObjectType } from '@nestjs/graphql';
import { RoomNode } from './room.model';

@ObjectType()
export class RoomEdge {
  @Field(() => String)
  cursor: string;

  @Field(() => RoomNode)
  node: RoomNode;
}
