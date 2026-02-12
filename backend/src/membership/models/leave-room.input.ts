import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LeaveRoomInput {
  @Field(() => String)
  roomId: string;
}
