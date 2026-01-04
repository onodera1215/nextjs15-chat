import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IsRegisteredUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  oauthProviderId: string;
}
