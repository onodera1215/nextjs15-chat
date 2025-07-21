import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoomStatusEnum } from './room-status.enum';

@ObjectType()
export class RoomNode {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => RoomStatusEnum)
  status: RoomStatusEnum;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
