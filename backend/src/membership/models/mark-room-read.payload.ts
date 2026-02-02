import { Field, ObjectType } from '@nestjs/graphql';
import { RoomReadState } from './room-read-state.model';

@ObjectType()
export class MarkRoomReadPayload {
  @Field(() => RoomReadState)
  readState: RoomReadState;
}
