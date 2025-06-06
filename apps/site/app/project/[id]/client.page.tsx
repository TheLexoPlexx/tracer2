"use client"

import { Add } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import { useRef } from "react";
import { ReactInfiniteCanvas, ReactInfiniteCanvasHandle } from "ws/infinite-canvas/src/main"
import Link from "next/link";
import { newNodeCommand } from "@/lib/commands";
import { CanvasNode } from "./canvasNode";
import { CanvasComponentNode } from "./canvasComponentNode";
import { useProject, CanvasNode as CanvasNodeType } from "./projectProvider";

export type CanvasNode = CanvasNodeType

export function ClientPage() {

  const { project, nodes, configurations, connections } = useProject();

  const canvasRef = useRef<ReactInfiniteCanvasHandle>(null);


  // schauen ob in ElsaWin Komponenten auch an der Seite verbindungen haben können
  // in der Node anzeigen, wie viel Verbindungen es gibt und wie viele noch frei sind
  // bei Klick auf Node, anzeigen, welche Verbindungen wohin gehen also Kabelfarben etc. und Button für die angeschlossene Komponente
  // die Verbindungen anklickbar machen, sodass diese Verbindung gehighlighted wird

  return (
    <ReactInfiniteCanvas
      ref={canvasRef}
      panOnScroll={false}
      invertScroll={true}
      zoomScale={0.1}
      onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
        mountFunc.fitContentToView({ scale: 1 });
      }}
    >
      <Box sx={{ overflow: "visible", position: "relative", positionStyle: { top: 0, left: 0 } }}>
        {
          nodes.length > 0 ?
            nodes.map((node) => {

              const nodeConnections = connections.filter((connection) => {
                return connection.node_from_id === node.id || connection.node_to_id === node.id;
              })

              return (
                <Box key={node.id + "frame"}>
                  <CanvasNode key={node.id + "node"} x={node.x} y={node.y}>
                    <CanvasComponentNode node={node} />
                  </CanvasNode>
                </Box>
              )
            })
            :
            <CanvasNode x={0} y={0}>
              <Tooltip title="Erste Node hinzufügen">
                <Button variant="contained" color="primary" component={Link} href={"/project/" + project.id + newNodeCommand.pathname}>
                  <Add />
                </Button>
              </Tooltip>
            </CanvasNode>
        }
      </Box>
    </ReactInfiniteCanvas>
  );
}
