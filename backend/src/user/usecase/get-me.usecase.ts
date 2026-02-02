import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { UserNode } from '../models/user.model';
import { JwtPayload } from 'src/types';

@Injectable()
export class GetMeUsecase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(payload: JwtPayload): Promise<UserNode | null> {
    if (!payload.email) {
      throw new BadRequestException();
    }
    return await this.userRepository.findByEmail(payload.email);
  }
}
