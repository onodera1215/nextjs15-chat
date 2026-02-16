import { Field, ObjectType } from '@nestjs/graphql';
import { UserEdge } from './user-edge.model';
import { UserNode } from './user.model';
import { PageInfo } from 'src/common/models/page-info.model';

@ObjectType()
export class UserConnection {
  @Field(() => [UserEdge])
  edges: UserEdge[];

  @Field(() => [UserNode])
  nodes: UserNode[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Number)
  totalCount: number;
}
