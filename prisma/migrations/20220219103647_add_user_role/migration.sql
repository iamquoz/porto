/*
  Warnings:

  - Added the required column `roleRoleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roleRoleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "role" (
    "roleId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("roleId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleRoleId_fkey" FOREIGN KEY ("roleRoleId") REFERENCES "role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;
