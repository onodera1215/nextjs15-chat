import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MessageEdge } from './message.edge';
import { MessageNode } from './message.model';
import { PageInfo } from 'src/common/models/page-info.model';

@ObjectType()
export class MessageConnection {
  @Field(() => [MessageEdge])
  edges: MessageEdge[];

  @Field(() => [MessageNode])
  nodes: MessageNode[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
