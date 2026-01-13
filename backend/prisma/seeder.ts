import { PrismaClient } from '@prisma/client';
import { RoomStatusEnum } from '../src/room/room.domain';

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

  console.log(`room id: ${room.id}`);
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
