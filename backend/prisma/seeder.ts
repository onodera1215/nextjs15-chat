import {
  PolicyAction,
  PrismaClient,
  ResourceType,
  UserStatus,
} from '@prisma/client';
import { RoomStatusEnum } from '../src/room/room.domain';
import { RoomRole } from '../src/consts';

const prisma = new PrismaClient();
async function seeder(prisma: PrismaClient) {
  await roomSeeder(prisma);
  await roleSeeder(prisma);
}

async function roomSeeder(prisma: PrismaClient) {
  // デフォルトルーム作成
  await prisma.room.upsert({
    where: { id: 'cml0gh5hd0003356vsf7p42f5' },
    update: {},
    create: {
      id: 'cml0gh5hd0003356vsf7p42f5',
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
}

/**
 * ロールシーダー
 * @param {PrismaClient} prisma
 */
async function roleSeeder(prisma: PrismaClient) {
  await prisma.$transaction(async (tx) => {
    // ルームオーナーロール作成
    await tx.role.upsert({
      where: { id: RoomRole.ROOM_OWNER },
      update: {},
      create: {
        id: RoomRole.ROOM_OWNER,
        name: RoomRole.ROOM_OWNER,
        scope: ResourceType.ROOM,
        rolePolicies: {
          createMany: {
            data: [
              {
                action: PolicyAction.READ,
                resource: ResourceType.ROOM,
              },
              {
                action: PolicyAction.WRITE,
                resource: ResourceType.ROOM,
              },
              {
                action: PolicyAction.DELETE,
                resource: ResourceType.ROOM,
              },
              {
                action: PolicyAction.READ,
                resource: ResourceType.MESSAGE,
              },
              {
                action: PolicyAction.WRITE,
                resource: ResourceType.MESSAGE,
              },
              {
                action: PolicyAction.DELETE,
                resource: ResourceType.MESSAGE,
              },
            ],
          },
        },
      },
    });
    // ルームメンバーロール作成
    await tx.role.upsert({
      where: { id: RoomRole.ROOM_MEMBER },
      update: {},
      create: {
        id: RoomRole.ROOM_MEMBER,
        name: RoomRole.ROOM_MEMBER,
        scope: ResourceType.ROOM,
        rolePolicies: {
          createMany: {
            data: [
              {
                action: PolicyAction.READ,
                resource: ResourceType.ROOM,
              },
              {
                action: PolicyAction.READ,
                resource: ResourceType.MESSAGE,
              },
              {
                action: PolicyAction.WRITE,
                resource: ResourceType.MESSAGE,
              },
              {
                action: PolicyAction.DELETE,
                resource: ResourceType.MESSAGE,
              },
            ],
          },
        },
      },
    });
  });
}

seeder(prisma)
  .then(() => console.log('シーダー実行完了'))
  .catch(console.error)
  .finally(() => {
    prisma
      .$disconnect()
      .then(() => console.log('DB切断完了'))
      .catch(console.error);
  });
