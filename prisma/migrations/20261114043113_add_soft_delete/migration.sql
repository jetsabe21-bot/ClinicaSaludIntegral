/*
  Warnings:

  - You are about to drop the column `password` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT '0123456';
