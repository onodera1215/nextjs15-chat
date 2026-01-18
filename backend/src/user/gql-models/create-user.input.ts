import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  icon: string;

  @Field(() => String)
  oauthProvider: string;

  @Field(() => String)
  oauthProviderAccountId: string;
}
