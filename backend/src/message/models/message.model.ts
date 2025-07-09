import { Field, ObjectType } from '@nestjs/graphql';
import { UserNode } from 'src/user/gql-models/user.model';

@ObjectType()
export class Message {
  @Field(() => String)
  id: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  roomId: string;

  @Field(() => UserNode)
  sender: UserNode;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
