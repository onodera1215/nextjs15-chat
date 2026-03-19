import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  body: string;

  @Field(() => String)
  roomId: string;

  @Field(() => String)
  senderId: string;
}
