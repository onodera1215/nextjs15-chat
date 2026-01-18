import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'クエリ検索用オプション' })
export class SearchMessagesInput {
  @Field(() => String, { nullable: true })
  roomId?: string;

  @Field(() => Number, { nullable: true })
  limit?: number;

  @Field(() => Number, { nullable: true })
  offset?: number;
}
