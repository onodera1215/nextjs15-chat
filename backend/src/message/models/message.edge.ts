import { Field, ObjectType } from '@nestjs/graphql';
import { MessageNode } from './message.model';

@ObjectType()
export class MessageEdge {
  @Field(() => String)
  cursor: string;

  @Field(() => MessageNode)
  node: MessageNode;
}
