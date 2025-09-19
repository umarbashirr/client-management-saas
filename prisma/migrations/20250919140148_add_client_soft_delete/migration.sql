-- AlterTable
ALTER TABLE "public"."client" ADD COLUMN     "deleteReason" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedBy" TEXT;

-- CreateIndex
CREATE INDEX "client_deletedAt_idx" ON "public"."client"("deletedAt");
