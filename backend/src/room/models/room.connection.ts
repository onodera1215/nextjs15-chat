import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoomEdge } from './room.edge';
import { RoomNode } from './room.model';
import { PageInfo } from 'src/common/models/page-info.model';

@ObjectType()
export class RoomConnection {
  @Field(() => [RoomEdge])
  edges: RoomEdge[];

  @Field(() => [RoomNode])
  nodes: RoomNode[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
