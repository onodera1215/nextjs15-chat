import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/user.repository.interface';
import { IsRegisteredUserInput } from '../gql-models/is-registered-user.input';

@Injectable()
export class IsRegisteredUserUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(input: IsRegisteredUserInput): Promise<boolean> {
    const { email, oauthProvider } = input;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }

    // 登録状況を取得
    const isActive = user.isActive();
    const isTheSameOauthProvider = user.isTheSameOauthProvider(oauthProvider);

    if (isActive && !isTheSameOauthProvider) {
      throw new BadRequestException(
        '既に異なるOAuthプロバイダーで登録されているメールアドレスです',
      );
    }

    return isActive && isTheSameOauthProvider;
  }
}
