/*
  Warnings:

  - You are about to drop the column `terminal_type_id` on the `Cable` table. All the data in the column will be lost.
  - You are about to drop the column `node_id` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `pin_number` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the `TerminalType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TracerNode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `node_from_id` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `node_to_id` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pin_number_from` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pin_number_to` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cable" DROP CONSTRAINT "Cable_terminal_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_node_id_fkey";

-- DropForeignKey
ALTER TABLE "TracerNode" DROP CONSTRAINT "TracerNode_component_id_fkey";

-- DropForeignKey
ALTER TABLE "TracerNode" DROP CONSTRAINT "TracerNode_configuration_id_fkey";

-- DropForeignKey
ALTER TABLE "TracerNode" DROP CONSTRAINT "TracerNode_project_id_fkey";

-- AlterTable
ALTER TABLE "Cable" DROP COLUMN "terminal_type_id";

-- AlterTable
ALTER TABLE "Configuration" ADD COLUMN     "inherits_from_id" TEXT;

-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "node_id",
DROP COLUMN "pin_number",
ADD COLUMN     "node_from_id" TEXT NOT NULL,
ADD COLUMN     "node_to_id" TEXT NOT NULL,
ADD COLUMN     "pin_number_from" INTEGER NOT NULL,
ADD COLUMN     "pin_number_to" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SignalType" ADD COLUMN     "voltage" DOUBLE PRECISION;

-- DropTable
DROP TABLE "TerminalType";

-- DropTable
DROP TABLE "TracerNode";

-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "component_id" TEXT NOT NULL,
    "configuration_id" TEXT,
    "project_id" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "y" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_configuration_id_fkey" FOREIGN KEY ("configuration_id") REFERENCES "Configuration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_node_from_id_fkey" FOREIGN KEY ("node_from_id") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_node_to_id_fkey" FOREIGN KEY ("node_to_id") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_inherits_from_id_fkey" FOREIGN KEY ("inherits_from_id") REFERENCES "Configuration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
