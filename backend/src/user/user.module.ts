import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserResolver } from './user.resolver';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { GetUserUsecase } from './usecase/get-user.usecase';
import { RegisteredUserUsecase } from './usecase/registered-user.usecase';
import { GetUserByEmailUsecase } from './usecase/get-user-by-email.usecase';
import { GetMeUsecase } from './usecase/get-me.usecase';

@Module({
  providers: [
    CreateUserUsecase,
    GetUserUsecase,
    GetUserByEmailUsecase,
    GetMeUsecase,
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
    GetMeUsecase,
  ],
})
export class UserModule {}
