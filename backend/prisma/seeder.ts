import { PrismaClient, UserStatus } from '@prisma/client';
import { RoomStatusEnum } from '../src/room/room.domain';
import { STATUS_CODES } from 'http';

const prisma = new PrismaClient();
async function seeder() {
  // デフォルトルーム作成
  const room = await prisma.room.create({
    data: {
      name: 'デフォルトルーム',
      description: 'デフォルトルーム',
      createdByUser: {
        create: {
          name: 'シーダーユーザー',
          email: 'user@example.com',
          oauthProvider: 'google',
          oauthProviderAccountId: 'seeder-oauth-provider-id',
          icon: 'https://example.com/icon.png',
          status: UserStatus.ACTIVE,
        },
      },
      status: RoomStatusEnum.ACTIVE,
    },
  });

  console.log(`room: ${JSON.stringify(room, null, 2)}`);
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
