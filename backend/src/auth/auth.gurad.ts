import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator';
import { JwtPayload } from 'src/types';
import { PrismaService } from 'src/prisma/prisma.service';

const secret = process.env.NEST_JWT_PUBLIC_KEY!;

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // @Public() デコレーターが付いている場合は認証をスキップ
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<{
      req:
        | { headers?: { authorization?: string } }
        | { connectionParams?: { authorization?: string } };
    }>();
    let authorization: string | undefined = undefined;
    // HTTPリクエストの場合
    if ('headers' in gqlContext.req) {
      authorization = gqlContext.req.headers?.authorization;
    }
    // WebSocket接続の場合
    if ('connectionParams' in gqlContext.req) {
      authorization = gqlContext.req.connectionParams?.authorization;
    }
    if (!authorization) {
      throw new UnauthorizedException('No authorization header found');
    }

    const splitedAutorization: string[] | undefined = authorization.split(' ');
    if (
      splitedAutorization?.length !== 2 ||
      splitedAutorization?.[0] !== 'Bearer'
    ) {
      throw new UnauthorizedException('Invalid authorization header format');
    }
    const accessToken = splitedAutorization[1];

    if (!accessToken) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        accessToken,
        {
          secret,
        },
      );

      // リクエストにユーザーペイロードをアタッチ
      const request = gqlContext.req;
      const user = await this.prisma.user.findUnique({
        where: { oauthProviderAccountId: payload.sub },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      request['payload'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token: ' + error);
    }
  }
}
