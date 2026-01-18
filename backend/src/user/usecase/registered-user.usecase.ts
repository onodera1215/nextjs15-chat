import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/user.repository.interface';
import { RegisteredUserInput } from '../gql-models/is-registered-user.input';
import { RegisteredUserModel } from '../gql-models/is-registered-user.model';

@Injectable()
export class RegisteredUserUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(input: RegisteredUserInput): Promise<RegisteredUserModel> {
    const { oauthProviderAccountId, oauthProvider } = input;
    const user = await this.userRepository.findByOauthProviderAccountId(
      oauthProviderAccountId,
    );
    if (!user) {
      return {
        isRegistered: false,
        isRegisteredInAnotherProvider: false,
      };
    }

    // 登録状況を取得
    const isActive = user.isActive();
    const isTheSameOauthProvider = user.isTheSameOauthProvider(oauthProvider);

    return {
      isRegistered: isActive && isTheSameOauthProvider,
      isRegisteredInAnotherProvider: isActive && !isTheSameOauthProvider,
    };
  }
}
