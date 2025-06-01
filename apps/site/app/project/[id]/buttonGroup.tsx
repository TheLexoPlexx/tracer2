"use client"

import { newNodeCommand } from "@/lib/commands";
import { Add, Hub } from "@mui/icons-material";
import { Button, Link } from "@mui/material";
import { ButtonGroup } from "@mui/material";

export function PageButtonGroup(props: {
  id: string
}) {

  return (
    <ButtonGroup variant="outlined" sx={{ backgroundColor: 'background.paper', position: 'absolute' }}>
      <Button startIcon={<Hub />} component={Link} href={"/project/" + props.id + newNodeCommand.pathname}>Node</Button>
      <Button startIcon={<Add />} disabled>Kabel</Button>
    </ButtonGroup>
  );
}