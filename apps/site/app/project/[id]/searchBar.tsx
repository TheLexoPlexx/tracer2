"use client"

import { useAppbar } from "@/hooks/useAppbar";
import { KeyboardCommandKey, Search } from "@mui/icons-material";
import { Chip, Paper, Stack, Typography } from "@mui/material";

export function SearchBar(props: { setOpen: (open: boolean) => void }) {

  const { appbarTitle } = useAppbar();
  const borderColor = "#333";

  return (
    <Paper sx={{ width: "30rem", outline: `1px solid ${borderColor}`, p: 0.5, backgroundColor: "transparent", cursor: "pointer" }} onClick={() => props.setOpen(true)}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Search />
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontStyle: "italic" }}>{appbarTitle.toUpperCase()}</Typography>
        <Chip sx={{ backgroundColor: "transparent", borderColor: borderColor }} icon={<KeyboardCommandKey />} variant="outlined" size="small" label="K" />
      </Stack>
    </Paper>
  );
}