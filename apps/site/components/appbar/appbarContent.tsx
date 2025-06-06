"use client"

import { Search, KeyboardCommandKey } from "@mui/icons-material"
import { Stack, Toolbar, Paper, Typography, Chip } from "@mui/material"
import { ReactNode } from "react";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { usePathname } from "next/navigation";

export function AppbarContent(props: {
  leftChildren?: ReactNode,
  rightChildren?: ReactNode
}) {

  const iconElevation = 10;
  // TODO: this looks ugly, find a better way to do this
  // Issue URL: https://github.com/TheLexoPlexx/tracer2/issues/6
  const borderColor = "#333";

  const { setOpen } = useCommandPalette();

  const pathname = usePathname();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" alignItems="center" gap={2} sx={{ ml: 1, zIndex: (theme) => theme.zIndex.appBar + iconElevation }}>
        {props.leftChildren ?? undefined}
      </Stack>
      <Toolbar>
        <Paper sx={{ width: "30rem", outline: `1px solid ${borderColor}`, p: 0.5, backgroundColor: "transparent", cursor: "pointer" }} onClick={() => setOpen(true)}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Search />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontStyle: "italic" }}>{pathname}</Typography>
            <Chip sx={{ backgroundColor: "transparent", borderColor: borderColor }} icon={<KeyboardCommandKey />} variant="outlined" size="small" label="K" />
          </Stack>
        </Paper>
      </Toolbar>
      <Stack direction="row" alignItems="center" gap={2} sx={{ mr: 1, zIndex: (theme) => theme.zIndex.appBar + iconElevation }}>
        {props.rightChildren ?? undefined}
      </Stack>
    </Stack>
  )
}