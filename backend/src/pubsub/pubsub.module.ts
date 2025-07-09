import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Global()
@Module({
  providers: [
    {
      provide: 'GqlPubSub',
      useValue: new PubSub(),
    },
  ],
  exports: ['GqlPubSub'],
})
export class PubsubModule {}
