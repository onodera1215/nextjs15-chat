import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { CreateUserInput } from '../gql-models/create-user.input';
import { UserNode } from '../gql-models/user.model';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<UserNode> {
    const userDomain = await this.userRepository.findByEmail(input.email);

    if (userDomain?.isActive()) {
      throw new BadRequestException('このメールアドレスは登録できません');
    }

    return await this.userRepository.createUser(input);
  }
}
