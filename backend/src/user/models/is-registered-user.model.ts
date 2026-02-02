import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisteredUserModel {
  @Field(() => Boolean)
  isRegistered: boolean;

  @Field(() => Boolean)
  isRegisteredInAnotherProvider: boolean;
}
