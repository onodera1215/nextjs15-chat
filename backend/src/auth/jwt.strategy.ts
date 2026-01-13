import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/types';

const publicKey = process.env.NEST_JWT_PUBLIC_KEY!;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // BearerトークンからJWTを取得
      ignoreExpiration: false, // 有効期限を無視しない
      secretOrKey: publicKey, // 公開鍵で検証
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
