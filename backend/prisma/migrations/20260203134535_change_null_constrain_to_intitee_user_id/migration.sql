/*
  Warnings:

  - Made the column `invitee_user_id` on table `invitations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_invitee_user_id_fkey";

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "invitee_user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invitee_user_id_fkey" FOREIGN KEY ("invitee_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
