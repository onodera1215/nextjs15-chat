import { Field, ObjectType } from '@nestjs/graphql';
import { UserNode } from './user.model';

@ObjectType()
export class UserEdge {
  @Field(() => String)
  cursor: string;

  @Field(() => UserNode)
  node: UserNode;
}
