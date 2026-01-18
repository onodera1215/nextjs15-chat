import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { UserNode } from '../gql-models/user.model';

@Injectable()
export class GetUserByEmailUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<UserNode | null> {
    return await this.userRepository.findByEmail(email);
  }
}
