import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/infrastructure/user.repository';
import { IUserRepository } from 'src/user/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async findActiveUserByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return user ? user.isActive() : false;
  }
}
