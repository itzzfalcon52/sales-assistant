/*
  Warnings:

  - A unique constraint covering the columns `[leadId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Conversation_leadId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_leadId_key" ON "Conversation"("leadId");
