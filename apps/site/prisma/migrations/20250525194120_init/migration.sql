-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colour" (
    "id" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,
    "red" INTEGER NOT NULL,
    "green" INTEGER NOT NULL,
    "blue" INTEGER NOT NULL,

    CONSTRAINT "Colour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignalType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SignalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cable" (
    "id" TEXT NOT NULL,
    "cross_section" DOUBLE PRECISION NOT NULL,
    "loom_id" TEXT,
    "signal_type_id" TEXT,
    "node_id" TEXT,

    CONSTRAINT "Cable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonCableSignalTypes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colour_id" TEXT NOT NULL,
    "signal_type_id" TEXT NOT NULL,

    CONSTRAINT "CommonCableSignalTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_label" TEXT NOT NULL,

    CONSTRAINT "Loom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Component" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_part_number" TEXT NOT NULL,
    "original_label" TEXT NOT NULL,
    "pin_count" INTEGER NOT NULL,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "configuration_id" TEXT,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "node_id" TEXT NOT NULL,
    "pin_number" INTEGER NOT NULL,
    "configuration_id" TEXT NOT NULL,
    "cable_id" TEXT NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CableToColour" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CableToColour_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CableToColour_B_index" ON "_CableToColour"("B");

-- AddForeignKey
ALTER TABLE "Cable" ADD CONSTRAINT "Cable_loom_id_fkey" FOREIGN KEY ("loom_id") REFERENCES "Loom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cable" ADD CONSTRAINT "Cable_signal_type_id_fkey" FOREIGN KEY ("signal_type_id") REFERENCES "SignalType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonCableSignalTypes" ADD CONSTRAINT "CommonCableSignalTypes_colour_id_fkey" FOREIGN KEY ("colour_id") REFERENCES "Colour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonCableSignalTypes" ADD CONSTRAINT "CommonCableSignalTypes_signal_type_id_fkey" FOREIGN KEY ("signal_type_id") REFERENCES "SignalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_configuration_id_fkey" FOREIGN KEY ("configuration_id") REFERENCES "Configuration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_configuration_id_fkey" FOREIGN KEY ("configuration_id") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_cable_id_fkey" FOREIGN KEY ("cable_id") REFERENCES "Cable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CableToColour" ADD CONSTRAINT "_CableToColour_A_fkey" FOREIGN KEY ("A") REFERENCES "Cable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CableToColour" ADD CONSTRAINT "_CableToColour_B_fkey" FOREIGN KEY ("B") REFERENCES "Colour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
