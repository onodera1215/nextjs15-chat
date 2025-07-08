import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './infrastructure/user.repository';
import { UserResolver } from './user.resolver';

@Module({
  providers: [
    UserService,
    UserResolver,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
