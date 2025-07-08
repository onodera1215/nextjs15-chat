import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserResolver } from './user.resolver';
import { CreateUserUsecase } from './usecase/create-user.usecase';

@Module({
  providers: [
    CreateUserUsecase,
    UserResolver,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [CreateUserUsecase],
})
export class UserModule {}
