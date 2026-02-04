/*
  Warnings:

  - The values [USER] on the enum `resource_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `roleId` on the `user_rooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,scope]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scope` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_role_id` to the `user_rooms` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role_scope" AS ENUM ('ROOM');

-- AlterEnum
BEGIN;
CREATE TYPE "resource_type_new" AS ENUM ('ROOM', 'MESSAGE');
ALTER TABLE "role_policies" ALTER COLUMN "resource" TYPE "resource_type_new" USING ("resource"::text::"resource_type_new");
ALTER TYPE "resource_type" RENAME TO "resource_type_old";
ALTER TYPE "resource_type_new" RENAME TO "resource_type";
DROP TYPE "resource_type_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_invitee_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_rooms" DROP CONSTRAINT "user_rooms_roleId_fkey";

-- DropIndex
DROP INDEX "roles_name_key";

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "invitee_user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "scope" "role_scope" NOT NULL;

-- AlterTable
ALTER TABLE "user_rooms" DROP COLUMN "roleId",
ADD COLUMN     "room_role_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "invitations_room_id_idx" ON "invitations"("room_id");

-- CreateIndex
CREATE INDEX "invitations_inviter_user_id_idx" ON "invitations"("inviter_user_id");

-- CreateIndex
CREATE INDEX "invitations_invitee_user_id_idx" ON "invitations"("invitee_user_id");

-- CreateIndex
CREATE INDEX "messages_roomId_idx" ON "messages"("roomId");

-- CreateIndex
CREATE INDEX "messages_senderId_idx" ON "messages"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_scope_key" ON "roles"("name", "scope");

-- CreateIndex
CREATE INDEX "room_reads_userId_idx" ON "room_reads"("userId");

-- CreateIndex
CREATE INDEX "room_reads_roomId_idx" ON "room_reads"("roomId");

-- CreateIndex
CREATE INDEX "user_rooms_userId_idx" ON "user_rooms"("userId");

-- CreateIndex
CREATE INDEX "user_rooms_roomId_idx" ON "user_rooms"("roomId");

-- CreateIndex
CREATE INDEX "user_rooms_room_role_id_idx" ON "user_rooms"("room_role_id");

-- AddForeignKey
ALTER TABLE "user_rooms" ADD CONSTRAINT "user_rooms_room_role_id_fkey" FOREIGN KEY ("room_role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invitee_user_id_fkey" FOREIGN KEY ("invitee_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
