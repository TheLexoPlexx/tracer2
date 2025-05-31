"use client"

import { AppbarActionPosition, useAppbar } from "@/hooks/useAppbar";
import { ArrowBack } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
import { CommandPaletteProvider } from "@/hooks/useCommandPalette";
import { CommandPalette } from "./commandPalette";

export function ClientLayout(props: { children: React.ReactNode, id: string }) {

  const { addAppbarAction, clearAppbarActions } = useAppbar();

  useEffect(() => {
    addAppbarAction(
      {
        id: "project-back",
        icon: <Tooltip title="Zurück"><ArrowBack sx={{ color: 'white' }} /></Tooltip>,
        position: AppbarActionPosition.LEFT,
        href: "/"
      }
    )

    return () => {
      clearAppbarActions();
    }
  }, [clearAppbarActions]);

  return (
    <CommandPaletteProvider>
      <CommandPalette />
      {props.children}
    </CommandPaletteProvider>
  );
}