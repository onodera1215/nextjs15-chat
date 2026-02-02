import { Field, ObjectType } from '@nestjs/graphql';
import { RoomNode } from './room.model';

@ObjectType()
export class CreateRoomPayload {
  @Field(() => RoomNode)
  room: RoomNode;
}
