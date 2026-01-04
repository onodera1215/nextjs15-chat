import { PrismaClient } from '@prisma/client';
import { RoomStatusEnum } from '../src/room/room.domain';
import { UserStatusEnum } from '../src/user/user.domain';

const prisma = new PrismaClient();
async function seeder() {
  // デフォルトルーム作成
  const room = await prisma.room.create({
    data: {
      name: 'デフォルトルーム',
      description: 'デフォルトルーム',
      status: RoomStatusEnum.ACTIVE,
    },
  });
  // デフォルトユーザーを作成
  const user = await prisma.user.create({
    data: {
      name: 'デフォルトユーザー',
      email: 'example@domain.com',
      oauthProvider: 'default-oauth-provider-id',
      status: UserStatusEnum.ACTIVE,
    },
  });

  console.log(`room id: ${room.id}`);
  console.log(`user id: ${user.id}`);
}

seeder()
  .then(() => console.log('シーダー実行完了'))
  .catch(console.error)
  .finally(() => {
    prisma
      .$disconnect()
      .then(() => console.log('DB切断完了'))
      .catch(console.error);
  });
