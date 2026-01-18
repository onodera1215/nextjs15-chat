import { Get, Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserResolver } from './user.resolver';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { GetUserUsecase } from './usecase/get-user.usecase';
import { RegisteredUserUsecase } from './usecase/registered-user.usecase';
import { GetUserByEmailUsecase } from './usecase/get-user-by-email.usecase';
import { GetMeUsecase } from './usecase/get-me.usecase';
import { GetUsersUsecase } from './usecase/get-users.usecase';

@Module({
  providers: [
    CreateUserUsecase,
    GetUserUsecase,
    GetUsersUsecase,
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
    GetUsersUsecase,
    GetUserByEmailUsecase,
    GetMeUsecase,
    UserResolver,
    RegisteredUserUsecase,
  ],
})
export class UserModule {}
