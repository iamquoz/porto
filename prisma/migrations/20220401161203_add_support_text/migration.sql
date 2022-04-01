-- CreateTable
CREATE TABLE "SupportTicketText" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "supportTicketTicketId" INTEGER NOT NULL,

    CONSTRAINT "SupportTicketText_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SupportTicketText" ADD CONSTRAINT "SupportTicketText_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicketText" ADD CONSTRAINT "SupportTicketText_supportTicketTicketId_fkey" FOREIGN KEY ("supportTicketTicketId") REFERENCES "SupportTicket"("TicketId") ON DELETE RESTRICT ON UPDATE CASCADE;
