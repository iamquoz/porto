-- CreateTable
CREATE TABLE "TicketStatus" (
    "StatusId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TicketStatus_pkey" PRIMARY KEY ("StatusId")
);

-- CreateTable
CREATE TABLE "SupportTicket" (
    "TicketId" SERIAL NOT NULL,
    "dateStarted" TIMESTAMP(3) NOT NULL,
    "dateResolved" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "ticketStatusStatusId" INTEGER NOT NULL,
    "orderOrderId" INTEGER NOT NULL,

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("TicketId")
);

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "agent_ticket_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "customer_ticket_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_orderOrderId_fkey" FOREIGN KEY ("orderOrderId") REFERENCES "Order"("OrderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_ticketStatusStatusId_fkey" FOREIGN KEY ("ticketStatusStatusId") REFERENCES "TicketStatus"("StatusId") ON DELETE RESTRICT ON UPDATE CASCADE;
