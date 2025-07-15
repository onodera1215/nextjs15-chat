import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { GetUserUsecase } from './usecase/get-user.usecase';

@Module({
  providers: [
    GetUserUsecase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [GetUserUsecase],
})
export class UserModule {}
