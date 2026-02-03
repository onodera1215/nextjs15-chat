import { Field, ObjectType } from '@nestjs/graphql';
import { UserNode } from './user.model';

@ObjectType()
export class RegisteredUserModel {
  @Field(() => Boolean)
  isRegistered: boolean;

  @Field(() => Boolean)
  isRegisteredInAnotherProvider: boolean;

  @Field(() => UserNode, { nullable: true })
  user?: UserNode;
}
