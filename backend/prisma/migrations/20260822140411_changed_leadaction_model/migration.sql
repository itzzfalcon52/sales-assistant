/*
  Warnings:

  - The `status` column on the `LeadAction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `action` on the `LeadAction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LeadActionType" AS ENUM ('SEND_WHATSAPP', 'SCHEDULE_CALLBACK', 'FOLLOW_UP', 'CONTINUE_DISCOVERY');

-- CreateEnum
CREATE TYPE "LeadActionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "LeadAction" DROP COLUMN "action",
ADD COLUMN     "action" "LeadActionType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "LeadActionStatus" NOT NULL DEFAULT 'PENDING';
