"use client"

import { Paper, Stack, Typography, Divider, Button, TextField, Autocomplete, Drawer, List, ListItem, ListItemText, ListItemButton, Box } from "@mui/material";
import { CanvasNode } from "./canvas";
import { AddLink, Launch } from "@mui/icons-material";
import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Configuration } from "@prisma/client";

export function CanvasComponentNode(props: {
  node: CanvasNode,
  configurations: Configuration[]
}) {

  const { id } = useParams();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [pin, setPin] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
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
          <Drawer
            id={popoverId}
            open={open}
            onClose={handleClose}
            anchor="right"
            variant="temporary"
          >
            <Stack spacing={2} sx={{ p: 2, width: "768px" }}>
              <Autocomplete
                options={props.configurations}
                getOptionLabel={(option) => option.name}
                defaultValue={props.configurations[0]}
                renderInput={(params) => <TextField {...params} label="Konfiguration" />}
              />
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
                  {/* <TextField
                    label="Pin"
                    type="number"
                    value={pin}
                    size="small"
                    onChange={(event) => setPin(parseInt(event.target.value))}
                    inputRef={inputRef}
                  /> */}
                  <Box sx={{ overflow: "auto", maxHeight: "90vh", width: "100%" }}>
                    <List disablePadding dense>
                      {
                        Array.from({ length: props.node.component.pin_count }, (_, i) => (
                          <ListItemButton key={i} onClick={() => setPin(i)} dense>
                            <ListItemText primary={i} />
                          </ListItemButton>
                        ))
                      }
                    </List>
                  </Box>
                </Stack>
                {/* <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleClose}
                  href={"/project/" + id + "/new-node?nodeId=" + props.node.id + "&pin=" + pin}
                >
                  <Launch />
                </Button> */}
              </Stack>
            </Stack>
          </Drawer>
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