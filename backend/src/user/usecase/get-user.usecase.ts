import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { UserNode } from '../gql-models/user.model';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class GetUserUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    private readonly loggerService: LoggerService,
  ) {}

  async execute(userId: string): Promise<UserNode | null> {
    // debug ログ出力
    return await this.userRepository.findById(userId);
  }
}
