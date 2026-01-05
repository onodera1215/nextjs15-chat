import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisteredUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  oauthProvider: string;
}
