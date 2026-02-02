import { Field, ObjectType } from '@nestjs/graphql';
import { UserNode } from './user.model';

@ObjectType()
export class CreateUserPayload {
  @Field(() => UserNode)
  user: UserNode;
}
