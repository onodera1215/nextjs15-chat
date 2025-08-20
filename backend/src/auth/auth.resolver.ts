import { Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { JwtPayload } from 'src/types';
import { CurrentPayload } from './current-payload.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  /**
   * @returns ユーザーが登録済みの場合はtrue、それ以外はfalse
   */
  @Public()
  @Query(() => Boolean, {
    description: 'ユーザーが登録済みかどうかを判定します。',
  })
  async isRegisteredUser(
    @CurrentPayload() payload?: JwtPayload,
  ): Promise<boolean> {
    if (!payload?.email) {
      return false;
    }
    return await this.authService.findActiveUserByEmail(payload?.email);
  }
}
