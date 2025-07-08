import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { UserStatusEnum } from './gql-models/user-status.enum';

@Injectable()
export class UserDomainService {
  constructor(private readonly userRepository: IUserRepository) {}

  async isActiveUser(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }
    return user.status === UserStatusEnum.ACTIVE;
  }
}
