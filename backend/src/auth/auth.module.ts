import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard } from './auth.gurad';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

const publicKey = process.env.NEST_JWT_PUBLIC_KEY!;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      publicKey,
      signOptions: { algorithm: 'RS256' },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    AuthService,
    AuthResolver,
  ],
})
export class AuthModule {}
