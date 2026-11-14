/*
  Warnings:

  - Added the required column `id_specialty` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "id_specialty" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_id_specialty_fkey" FOREIGN KEY ("id_specialty") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
