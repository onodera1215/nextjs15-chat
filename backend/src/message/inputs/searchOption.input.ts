import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'クエリ検索用オプション' })
export class SearchOptionInput {
  @Field(() => String)
  roomId: string;

  @Field(() => Number, { nullable: true })
  limit?: number;

  @Field(() => Number, { nullable: true })
  offset?: number;
}
