/*
  Warnings:

  - You are about to drop the column `node_id` on the `Cable` table. All the data in the column will be lost.
  - You are about to drop the column `node_id` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the `Node` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `TracerNode_id` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_node_id_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_component_id_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_configuration_id_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_project_id_fkey";

-- AlterTable
ALTER TABLE "Cable" DROP COLUMN "node_id",
ADD COLUMN     "TracerNode_id" TEXT;

-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "node_id",
ADD COLUMN     "TracerNode_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Node";

-- CreateTable
CREATE TABLE "TracerNode" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "configuration_id" TEXT,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "TracerNode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TracerNode" ADD CONSTRAINT "TracerNode_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TracerNode" ADD CONSTRAINT "TracerNode_configuration_id_fkey" FOREIGN KEY ("configuration_id") REFERENCES "Configuration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TracerNode" ADD CONSTRAINT "TracerNode_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_TracerNode_id_fkey" FOREIGN KEY ("TracerNode_id") REFERENCES "TracerNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
