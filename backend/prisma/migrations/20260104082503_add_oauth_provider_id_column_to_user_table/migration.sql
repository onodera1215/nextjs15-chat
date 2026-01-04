/*
  Warnings:

  - A unique constraint covering the columns `[oauth_provider_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `oauth_provider_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "oauth_provider_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_oauth_provider_id_key" ON "users"("oauth_provider_id");
