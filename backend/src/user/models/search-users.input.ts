import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'ユーザー検索オプション' })
export class SearchUsersInput {
  @Field(() => String, { nullable: true, description: '名前で部分一致検索' })
  name?: string;

  @Field(() => String, {
    nullable: true,
    description: 'メールアドレスで部分一致検索',
  })
  email?: string;

  @Field(() => String, { nullable: true })
  after?: string | null;
}
