import { IUserRepository } from '../user.repository.interface';
import { UserStatusEnum } from '../gql-models/user-status.enum';
import { IUserDomainService } from '../user.domain.service.interface';

export class UserDomainService implements IUserDomainService {
  constructor(private readonly userRepository: IUserRepository) {}

  async isActiveUser(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }
    return user.status === UserStatusEnum.ACTIVE;
  }
}
