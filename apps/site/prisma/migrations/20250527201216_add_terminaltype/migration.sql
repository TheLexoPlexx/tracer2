-- AlterTable
ALTER TABLE "Cable" ADD COLUMN     "terminal_type_id" TEXT;

-- CreateTable
CREATE TABLE "TerminalType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "TerminalType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cable" ADD CONSTRAINT "Cable_terminal_type_id_fkey" FOREIGN KEY ("terminal_type_id") REFERENCES "TerminalType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
