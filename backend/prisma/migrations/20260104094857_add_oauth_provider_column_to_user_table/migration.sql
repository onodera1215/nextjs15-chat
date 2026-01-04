/*
  Warnings:

  - A unique constraint covering the columns `[oauth_provider]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `oauth_provider` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "oauth_provider" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_oauth_provider_key" ON "users"("oauth_provider");
