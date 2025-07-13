import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserResolver } from './user.resolver';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { GetUserUsecase } from './usecase/get-user.usecase';

@Module({
  providers: [
    CreateUserUsecase,
    GetUserUsecase,
    UserResolver,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [CreateUserUsecase, GetUserUsecase],
})
export class UserModule {}
