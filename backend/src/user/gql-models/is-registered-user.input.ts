import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisteredUserInput {
  @Field(() => String)
  oauthProvider: string;

  @Field(() => String)
  oauthProviderAccountId: string;
}
