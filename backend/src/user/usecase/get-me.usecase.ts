import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { UserNode } from '../gql-models/user.model';
import { JwtPayload } from 'src/types';

@Injectable()
export class GetMeUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(payload: JwtPayload): Promise<UserNode | null> {
    if (!payload.id) {
      throw new BadRequestException();
    }
    return await this.userRepository.findById(payload.id);
  }
}
