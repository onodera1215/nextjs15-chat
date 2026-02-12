import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MarkRoomReadInput {
  @Field(() => String)
  roomId: string;

  @Field(() => Date, {
    nullable: true,
    description: '最終既読日時（単調増加）',
  })
  lastReadAt?: Date;
}
