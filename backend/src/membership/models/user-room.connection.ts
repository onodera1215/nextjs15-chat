import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserRoomNode } from './user-room.model';
import { UserRoomEdge } from './user-room.edge';
import { PageInfo } from 'src/common/models/page-info.model';

@ObjectType()
export class UserRoomConnection {
  @Field(() => [UserRoomEdge])
  edges: UserRoomEdge[];

  @Field(() => [UserRoomNode])
  nodes: UserRoomNode[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
