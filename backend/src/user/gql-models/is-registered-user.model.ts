import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IsRegisteredUserModel {
  @Field(() => Boolean)
  isRegistered: boolean;

  @Field(() => Boolean)
  isRegisteredInAnotherProvider: boolean;
}
