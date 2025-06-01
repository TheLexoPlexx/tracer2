"use client"

import { useAppbar, AppbarActionPosition } from "@/hooks/useAppbar";
import { Add, Settings } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import { Component, Project, TracerNode } from "@prisma/client";
import { useEffect, useRef } from "react";
import { ReactInfiniteCanvas, ReactInfiniteCanvasHandle } from "ws/infinite-canvas/src/main"
import Link from "next/link";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { newNodeCommand } from "@/lib/commands";
import { CanvasNode } from "./canvasNode";
import { CanvasComponentNode } from "./canvasComponentNode";

export function Canvas(props: {
  project: Project,
  nodes: (TracerNode & { component: Component })[]
}) {

  const { setAppbarTitle, addAppbarAction, clearAppbarActions } = useAppbar();
  const { addCommands, removeCommand } = useCommandPalette();

  useEffect(() => {
    addAppbarAction(
      {
        id: "project-settings",
        icon: <Tooltip title="Einstellungen"><Settings sx={{ color: 'white' }} /></Tooltip>,
        position: AppbarActionPosition.RIGHT,
        href: "/project/" + props.project.id + "/settings"
      }
    );

    addCommands([newNodeCommand]);

    return () => {
      clearAppbarActions();
      setAppbarTitle();
      removeCommand(newNodeCommand.name);
    };
  }, [clearAppbarActions, removeCommand]);

  const canvasRef = useRef<ReactInfiniteCanvasHandle>(null);

  // TODO: Modal oder Drawer öffnen mit Component Library
  // Issue URL: https://github.com/TheLexoPlexx/tracer2/issues/1
  // - von dort aus dann Bauteil auswählen oder anlegen

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
      enableArrowKeyPan={true}
      onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
        mountFunc.fitContentToView({ scale: 1 });
      }}>
      <>
        {
          props.nodes.length > 0 ?
            props.nodes.map((node) => (
              <>
                <CanvasNode key={node.id} x={node.x} y={node.y}>
                  <CanvasComponentNode node={node} />
                </CanvasNode>
                <CanvasNode key={node.id} x={node.x + 300} y={node.y}>
                  <CanvasComponentNode node={node} />
                </CanvasNode>
                <CanvasNode key={node.id} x={node.x} y={node.y + 300}>
                  <CanvasComponentNode node={node} />
                </CanvasNode>
                <CanvasNode key={node.id} x={node.x - 300} y={node.y}>
                  <CanvasComponentNode node={node} />
                </CanvasNode>
                <CanvasNode key={node.id} x={node.x} y={node.y - 300}>
                  <CanvasComponentNode node={node} />
                </CanvasNode>
              </>
            ))
            :
            <CanvasNode x={0} y={0}>
              <Tooltip title="Erste Node hinzufügen">
                <Button variant="contained" color="primary" component={Link} href={"/project/" + props.project.id + newNodeCommand.pathname}>
                  <Add />
                </Button>
              </Tooltip>
            </CanvasNode>
        }
      </>
    </ReactInfiniteCanvas>
  );
}
