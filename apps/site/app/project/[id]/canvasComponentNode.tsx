"use client"

import { Paper, Stack, Typography, Divider, Button, TextField, Autocomplete, Drawer, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { AddLink, Storage } from "@mui/icons-material";
import { useState, useRef } from "react";
import { CanvasConnection } from "@/lib/auxPrismaTypes";
import { CanvasNode } from "./client.page";
import { cableColourBackground } from "@/lib/cssHelper";
import { useProject } from "./projectProvider";

export function CanvasComponentNode(props: {
  node: CanvasNode,
}) {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { project, configurations, connections } = useProject();

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
                options={configurations}
                getOptionLabel={(option) => option.name}
                defaultValue={configurations[0]}
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
                    <Table stickyHeader size="small" sx={{ width: "100%" }}>
                      <TableHead sx={{ background: "primary" }}>
                        <TableRow>
                          <TableCell align="center">Pin</TableCell>
                          <TableCell align="center">Signal</TableCell>
                          <TableCell align="center">Pin@Node</TableCell>
                          <TableCell align="center">Node</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          Array.from({ length: props.node.component.pin_count }, (_, i) => {

                            const connections_from = connections.filter((connection) => {
                              return connection.node_from_id === props.node.id && connection.pin_number_from === i;
                            });

                            const connections_to = connections.filter((connection) => {
                              return connection.node_to_id === props.node.id && connection.pin_number_to === i;
                            });

                            if (connections_from.length === 0 && connections_to.length === 0) {
                              return (
                                <ConnectionRow key={i} nodeId={props.node.id} projectId={project.id} configurationId={configurations[0].id} pin={i} />
                              )
                            } else {
                              connections_from.map((connection) => {
                                return (
                                  <ConnectionRow key={connection.id} nodeId={props.node.id} projectId={project.id} configurationId={connection.configuration_id} connection={connection} pin={i} />
                                )
                              })
                              connections_to.map((connection) => {
                                return (
                                  <ConnectionRow key={connection.id} nodeId={props.node.id} projectId={project.id} configurationId={connection.configuration_id} connection={connection} pin={i} />
                                )
                              })
                            }
                          })
                        }
                      </TableBody>
                    </Table>
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

function ConnectionRow(props: {
  nodeId: string,
  projectId: string,
  connection?: CanvasConnection,
  configurationId?: string,
  pin: number
}) {

  if (!props.connection) {
    return (
      <TableRow>
        <TableCell align="center">{props.pin}</TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center">
          <Button href={"/project/" + props.projectId + "/new-node?nodeId=" + props.nodeId + "&pin=" + props.pin + "&configurationId=" + props.configurationId + "&connectionId=new"} variant="outlined" color="primary" size="small">
            <AddLink />
          </Button>
        </TableCell>
      </TableRow>
    )
  } else {
    return (
      <TableRow
        sx={{ background: cableColourBackground(props.connection.cable.colour) }}
        key={props.connection.id}>
        <TableCell align="center">{props.connection.pin_number_from}</TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center">?</TableCell>
        <TableCell align="center">
          <Button variant="outlined" color="primary" size="small">
            <Storage />
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}