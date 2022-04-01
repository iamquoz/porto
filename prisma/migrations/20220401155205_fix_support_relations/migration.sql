/*
  Warnings:

  - You are about to drop the column `userId` on the `SupportTicket` table. All the data in the column will be lost.
  - Added the required column `agentId` to the `SupportTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `SupportTicket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SupportTicket" DROP CONSTRAINT "agent_ticket_fkey";

-- DropForeignKey
ALTER TABLE "SupportTicket" DROP CONSTRAINT "customer_ticket_fkey";

-- AlterTable
ALTER TABLE "SupportTicket" DROP COLUMN "userId",
ADD COLUMN     "agentId" TEXT NOT NULL,
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "agent_ticket_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "customer_ticket_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
