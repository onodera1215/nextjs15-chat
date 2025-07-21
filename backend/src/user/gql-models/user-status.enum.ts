import { registerEnumType } from '@nestjs/graphql';
import { UserStatusEnum } from '../user.domain';

registerEnumType(UserStatusEnum, {
  name: 'UserStatus',
  description: 'ユーザーステータス',
});

export { UserStatusEnum };
