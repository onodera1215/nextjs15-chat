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

const secret = process.env.NEST_JWT_PUBLIC_KEY!;

// TODO フロント・バックで使い回したい
type JwtPayload = {
  sub?: string;
  email?: string;
  name?: string;
  roles?: string[];
};

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
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
    const request = ctx.getContext<{
      request: { headers: { authorization?: string } };
    }>().request;
    const splitedAutorization: string[] | undefined =
      request.headers.authorization?.split(' ');
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
      request['user'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token: ' + error);
    }
  }
}
