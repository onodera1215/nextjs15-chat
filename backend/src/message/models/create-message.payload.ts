import { Field, ObjectType } from '@nestjs/graphql';
import { MessageNode } from './message.model';

@ObjectType()
export class CreateMessagePayload {
  @Field(() => MessageNode)
  message: MessageNode;
}
