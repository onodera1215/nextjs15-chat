import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JoinRoomInput {
  @Field(() => String)
  roomId: string;
}
