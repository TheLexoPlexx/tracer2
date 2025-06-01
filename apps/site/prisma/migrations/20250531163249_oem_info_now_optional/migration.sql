/*
  Warnings:

  - Added the required column `x` to the `TracerNode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `TracerNode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Component" ALTER COLUMN "original_part_number" DROP NOT NULL,
ALTER COLUMN "original_label" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TracerNode" ADD COLUMN     "x" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y" DOUBLE PRECISION NOT NULL;
