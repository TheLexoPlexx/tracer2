"use client"

import { useAppbar, AppbarActionPosition } from "@/hooks/useAppbar";
import { Add, Settings } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import { Component, Project, TracerNode } from "@prisma/client";
import { useEffect, useRef } from "react";
import { ReactInfiniteCanvas, ReactInfiniteCanvasHandle } from "ws/infinite-canvas/src/main"

export function Canvas(props: {
  project: Project,
  nodes: (TracerNode & { component: Component })[]
}) {

  const { setAppbarTitle, addAppbarAction, setAppbarActions } = useAppbar();

  useEffect(() => {
    setAppbarTitle(props.project.name);
    addAppbarAction(
      {
        id: "project-settings",
        icon: <Tooltip title="Einstellungen"><Settings sx={{ color: 'white' }} /></Tooltip>,
        position: AppbarActionPosition.RIGHT,
        href: "/project/" + props.project.id + "/settings"
      }
    );

    return () => {
      setAppbarActions([]);
      setAppbarTitle();
    };
  }, [setAppbarActions]);

  const canvasRef = useRef<ReactInfiniteCanvasHandle>(null);

  return (
    <ReactInfiniteCanvas
      ref={canvasRef}
      panOnScroll={false}
      invertScroll={true}
      zoomScale={0.1}
      onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
        mountFunc.fitContentToView({ scale: 1 });
      }}>
      <Box>
        {
          props.nodes.length > 0 ?
            props.nodes.map((node) => (
              <pre key={node.id}>
                {JSON.stringify(node, null, 2)}
              </pre>
            ))
            :
            <Tooltip title="Add First Node">
              <Button variant="contained" color="primary">
                <Add />
              </Button>
            </Tooltip>
        }
      </Box>
    </ReactInfiniteCanvas>
  );
}
