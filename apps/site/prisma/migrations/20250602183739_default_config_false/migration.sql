/*
  Warnings:

  - You are about to drop the column `TracerNode_id` on the `Cable` table. All the data in the column will be lost.
  - You are about to drop the column `TracerNode_id` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the `CommonCableSignalTypes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `node_id` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommonCableSignalTypes" DROP CONSTRAINT "CommonCableSignalTypes_colour_id_fkey";

-- DropForeignKey
ALTER TABLE "CommonCableSignalTypes" DROP CONSTRAINT "CommonCableSignalTypes_signal_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_TracerNode_id_fkey";

-- AlterTable
ALTER TABLE "Cable" DROP COLUMN "TracerNode_id";

-- AlterTable
ALTER TABLE "Configuration" ALTER COLUMN "default" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "TracerNode_id",
ADD COLUMN     "node_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "CommonCableSignalTypes";

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "TracerNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
