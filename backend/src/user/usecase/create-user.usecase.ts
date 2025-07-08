import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { CreateUserInput } from '../gql-models/create-user.input';
import { UserNode } from '../gql-models/user.model';
import { IUserDomainService } from '../user.domain.service.interface';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('IUserDomainService')
    private readonly userDomainService: IUserDomainService,
  ) {}

  async execute(input: CreateUserInput): Promise<UserNode> {
    if (await this.userDomainService.isActiveUser(input.email)) {
      throw new BadRequestException('このユーザーは登録できません');
    }
    return await this.userRepository.createUser(input);
  }
}
