import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchRoomOptionInput {
  @Field(() => String, { nullable: true })
  userId?: string | null;

  @Field(() => String, { nullable: true })
  roomId?: string | null;

  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | null;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;

  @Field(() => String, { nullable: true })
  after?: string | null;
}
