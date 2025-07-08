import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserResolver } from './user.resolver';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { UserDomainService } from './infrastructure/user.domain.service';

@Module({
  providers: [
    CreateUserUsecase,
    UserResolver,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IUserDomainService',
      useClass: UserDomainService,
    },
  ],
  exports: [CreateUserUsecase],
})
export class UserModule {}
