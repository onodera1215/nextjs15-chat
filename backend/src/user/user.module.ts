import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserResolver } from './user.resolver';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { GetUserUsecase } from './usecase/get-user.usecase';
import { IsRegisteredUserUsecase } from './usecase/is-registered-user.usecase';

@Module({
  providers: [
    CreateUserUsecase,
    GetUserUsecase,
    UserResolver,
    IsRegisteredUserUsecase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [CreateUserUsecase, GetUserUsecase, IsRegisteredUserUsecase],
})
export class UserModule {}
