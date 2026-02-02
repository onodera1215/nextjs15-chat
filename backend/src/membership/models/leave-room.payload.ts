import { Field, ObjectType } from '@nestjs/graphql';
import { RoomNode } from 'src/room/models/room.model';

@ObjectType()
export class LeaveRoomPayload {
  @Field(() => RoomNode)
  room: RoomNode;
}
