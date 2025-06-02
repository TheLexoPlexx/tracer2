"use client"

import { Paper, Stack, Typography, Divider, Button, Popover, TextField } from "@mui/material";
import { CanvasNode } from "./canvas";
import { AddLink, Launch } from "@mui/icons-material";
import { useState } from "react";
import { useParams } from "next/navigation";

export function CanvasComponentNode(props: {
  node: CanvasNode
}) {

  const { id } = useParams();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [pin, setPin] = useState<number>(0);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  return (
    <Paper sx={{ borderRadius: "1", padding: 2 }} >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={1}>
          <Typography variant="h6">{props.node.component.name}</Typography>
          <Button variant="outlined" color="primary" size="small" onClick={handleClick}>
            <AddLink />
          </Button>
          <Popover
            id={popoverId}
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Stack sx={{ p: 2 }} direction="row" spacing={2}>
              <TextField
                label="Pin"
                type="number"
                value={pin}
                size="small"
                onChange={(event) => setPin(parseInt(event.target.value))}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleClose}
                href={"/project/" + id + "/new-node?nodeId=" + props.node.id + "&pin=" + pin}
              >
                <Launch />
              </Button>
            </Stack>
          </Popover>
        </Stack>
        <Divider />
        <Stack direction="row" spacing={1}>
          {/* <Typography variant="body2">{props.node.component.name}</Typography> */}
          {/* <Divider orientation="vertical" flexItem /> */}
          <Typography variant="body2">{"0" + "/" + props.node.component.pin_count + " Pins"}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}