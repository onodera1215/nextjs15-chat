import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserStatusEnum } from './user-status.enum';

@ObjectType()
export class UserNode {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  oauthProviderId;

  @Field(() => UserStatusEnum)
  status: UserStatusEnum;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
