import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserResolver } from './user.resolver';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { GetUserUsecase } from './usecase/get-user.usecase';
import { RegisteredUserUsecase } from './usecase/registered-user.usecase';
import { GetUserByEmailUsecase } from './usecase/get-user-by-email.usecase';

@Module({
  providers: [
    CreateUserUsecase,
    GetUserUsecase,
    GetUserByEmailUsecase,
    UserResolver,
    RegisteredUserUsecase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [
    CreateUserUsecase,
    GetUserUsecase,
    RegisteredUserUsecase,
    GetUserByEmailUsecase,
  ],
})
export class UserModule {}
