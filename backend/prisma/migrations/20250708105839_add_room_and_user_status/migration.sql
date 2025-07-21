/*
  Warnings:

  - Added the required column `status` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "room_status" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "status" "room_status" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "user_status" NOT NULL;
