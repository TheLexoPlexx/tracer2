"use client"

import { AppbarActionPosition, useAppbar } from "@/hooks/useAppbar";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { Home } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";

export function ClientLayout(props: { children: React.ReactNode }) {

  const { addAppbarAction, clearAppbarActions } = useAppbar();
  const { addCommands } = useCommandPalette();

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