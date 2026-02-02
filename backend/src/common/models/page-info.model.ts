import { Field } from '@nestjs/graphql';

@Object
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => String, { nullable: true })
  endCursor?: string;
}
