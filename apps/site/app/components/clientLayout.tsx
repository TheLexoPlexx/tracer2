"use client"

import { AppbarActionPosition, useAppbar } from "@/hooks/useAppbar";
import { Home } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";

export function ClientLayout(props: { children: React.ReactNode, id: string }) {

  const { addAppbarAction, clearAppbarActions } = useAppbar();

  useEffect(() => {
    addAppbarAction(
      {
        id: "project-back",
        icon: <Tooltip title="Zurück"><Home sx={{ color: 'white' }} /></Tooltip>,
        position: AppbarActionPosition.LEFT,
        href: "/"
      }
    )

    return () => {
      clearAppbarActions();
    }
  }, [clearAppbarActions]);

  return props.children;
}