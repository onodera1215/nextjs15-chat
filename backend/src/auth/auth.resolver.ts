import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserNode } from 'src/user/gql-models/user.model';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject('GqlPubSub')
    private readonly gqlPubSub: PubSub,
  ) {}

  @Subscription(() => UserNode, {
    name: 'userSignedUp',
  })
  userSignedUp() {
    return this.gqlPubSub.asyncIterableIterator<UserNode>('userSignedUp');
  }
}
