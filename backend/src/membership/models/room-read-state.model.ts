import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoomReadState {
  @Field(() => ID)
  roomId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Date)
  lastReadAt: Date;

  @Field(() => Number, {
    description: '未読メッセージ数(厳密な数はqueryで取得すること)',
  })
  unreadCount: number;
}
