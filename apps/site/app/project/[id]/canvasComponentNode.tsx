"use client"

import { Paper, Stack, Typography, Divider, Button, TextField, Autocomplete, Drawer, Box, Table, TableBody, TableCell, TableHead, TableRow, Popover } from "@mui/material";
import { AddLink, Storage } from "@mui/icons-material";
import { useState, useRef } from "react";
import { CanvasConnection } from "@/lib/auxPrismaTypes";
import { CanvasNode } from "./client.page";
import { cableColourBackground } from "@/lib/cssHelper";
import { useProject } from "./projectProvider";

export function CanvasComponentNode(props: {
  node: CanvasNode,
}) {

  const [nodeSettingsOpen, setNodeSettingsOpen] = useState(false);
  const [addConnectionAnchorEl, setAddConnectionAnchorEl] = useState<HTMLTableRowElement | null>(null);
  const addConnectionOpen = Boolean(addConnectionAnchorEl);
  const popoverId = addConnectionOpen ? 'simple-popover' : undefined;

  const inputRef = useRef<HTMLInputElement>(null);

  const { project, configurations, connections } = useProject();

  function handleNodeSettingsClick() {
    setNodeSettingsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  function handleAddConnectionClick(popoverRef: HTMLTableRowElement | null) {
    setAddConnectionAnchorEl(popoverRef);
  }

  return (
    <Paper sx={{ borderRadius: "1", padding: 2 }} >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={1}>
          <Typography variant="h6">{props.node.component.name}</Typography>

          <Button variant="outlined" color="primary" size="small" onClick={handleNodeSettingsClick}>
            <AddLink />
          </Button>
          <Drawer
            open={nodeSettingsOpen}
            onClose={() => setNodeSettingsOpen(false)}
            anchor="right"
            variant="temporary">
            <Stack spacing={2} sx={{ p: 2, width: "45vw" }}>
              <Autocomplete
                options={configurations}
                getOptionLabel={(option) => option.name}
                defaultValue={configurations[0]}
                renderInput={(params) => <TextField {...params} label="Konfiguration" />}
              />
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
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
                          Array.from({ length: props.node.component.pin_count }, (_, i_0) => {

                            let i = i_0 + 1;

                            const connection_list = connections.filter((connection) => {
                              return connection.node_from_id === props.node.id && connection.pin_number_from === i || connection.node_to_id === props.node.id && connection.pin_number_to === i;
                            });

                            if (connection_list.length === 0) {
                              return (
                                <ConnectionRow
                                  key={i}
                                  nodeId={props.node.id}
                                  projectId={project.id}
                                  configurationId={configurations[0].id} pin={i}
                                  popoverId={popoverId}
                                  handleAddConnectionClick={handleAddConnectionClick} />
                              )
                            } else {
                              connection_list.map((connection) => {
                                return (
                                  <ConnectionRow
                                    key={connection.id}
                                    nodeId={props.node.id}
                                    projectId={project.id}
                                    configurationId={connection.configuration_id}
                                    connection={connection}
                                    pin={i}
                                    popoverId={popoverId}
                                    handleAddConnectionClick={handleAddConnectionClick} />
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

          <Popover
            id={popoverId}
            open={addConnectionOpen}
            onClose={() => setAddConnectionAnchorEl(null)}
            anchorEl={addConnectionAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Stack spacing={2} sx={{ p: 2, width: "45vw" }}>
              <Typography variant="h6">Neue Verbindung</Typography>
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

function ConnectionRow(props: {
  nodeId: string,
  projectId: string,
  connection?: CanvasConnection,
  configurationId?: string,
  pin: number,
  popoverId: string | undefined,
  handleAddConnectionClick: (popoverRef: HTMLTableRowElement | null) => void
}) {

  const popoverRef = useRef<HTMLTableRowElement | null>(null);

  if (!props.connection) {
    return (
      <TableRow ref={popoverRef}>
        <TableCell align="center">{props.pin}</TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center">
          <Button variant="outlined" color="primary" size="small" onClick={() => {
            props.handleAddConnectionClick(popoverRef.current);
          }} id={props.popoverId}>
            {/* <Button href={"/project/" + props.projectId + "/new-node?nodeId=" + props.nodeId + "&pin=" + props.pin + "&configurationId=" + props.configurationId + "&connectionId=new"} variant="outlined" color="primary" size="small"> */}
            <AddLink />
          </Button>
        </TableCell>
      </TableRow>
    )
  } else {
    return (
      <TableRow
        ref={popoverRef}
        sx={{ background: cableColourBackground(props.connection.cable.colour) }}
        key={props.connection.id}>
        <TableCell align="center">{props.connection.pin_number_from}</TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center">?</TableCell>
        <TableCell align="center">
          <Button variant="outlined" color="primary" size="small" onClick={() => {
            props.handleAddConnectionClick(popoverRef.current);
          }} id={props.popoverId}>
            <Storage />
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}