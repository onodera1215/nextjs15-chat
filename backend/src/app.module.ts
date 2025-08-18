import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MessageResolver } from './message/message.resolver';
import { UserResolver } from './user/user.resolver';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { RoomResolver } from './room/room.resolver';
import { RoomModule } from './room/room.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { LoggerModule } from './logger/logger.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const publicKey = process.env.NEST_JWT_PUBLIC_KEY!;

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    PassportModule,
    JwtModule.register({
      publicKey,
      signOptions: { algorithm: 'RS256' },
    }),
    PrismaModule,
    MessageModule,
    UserModule,
    RoomModule,
    PubsubModule,
    LoggerModule,
  ],
  providers: [MessageResolver, UserResolver, PrismaService, RoomResolver],
})
export class AppModule {}
