"use client"

import { Box } from "@mui/material";
import { TracerNode } from "@prisma/client";

export function CanvasComponentNode(props: { node: TracerNode }) {
  return (
    <Box width={200} height={200} bgcolor="red">
      {JSON.stringify(props.node, null, 2)}
    </Box>
  );
}