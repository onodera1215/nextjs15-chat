import { Field, ObjectType } from '@nestjs/graphql';
import { UserRoomNode } from './user-room.model';
import { RoomNode } from 'src/room/models/room.model';

@ObjectType()
export class JoinRoomPayload {
  @Field(() => UserRoomNode)
  membership: UserRoomNode;

  @Field(() => RoomNode)
  room: RoomNode;
}
