import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { UserNode } from '../gql-models/user.model';

@Injectable()
export class GetUserUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<UserNode | null> {
    return await this.userRepository.findById(userId);
  }
}
