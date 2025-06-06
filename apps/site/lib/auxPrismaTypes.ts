import { Connection, Node, Cable, Configuration, Colour, Loom, SignalType } from "@prisma/client";

export type CableWithRelations = Cable & {
  colour: Colour[],
  loom: Loom | null,
  signal_type: SignalType | null
}

export type CanvasConnection = Connection & {
  node_from: Node,
  node_to: Node,
  cable: CableWithRelations,
  configuration: Configuration
}
