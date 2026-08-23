-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "business" TEXT,
    "products" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "features" TEXT[],
    "intent" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "barrier" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_callId_key" ON "Lead"("callId");
