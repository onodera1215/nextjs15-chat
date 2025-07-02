import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Message {
  @Field(() => String)
  id: string;

  @Field(() => String)
  roomId: string;

  @Field(() => User)
  sender: User;

  @Field(() => [User])
  readUsers: User[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
