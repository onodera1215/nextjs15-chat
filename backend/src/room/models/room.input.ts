import { Field, InputType } from '@nestjs/graphql';
import { RoomStatusEnum } from './room-status.enum';

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => RoomStatusEnum)
  status: RoomStatusEnum;
}
