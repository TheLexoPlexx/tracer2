"use client"

import { Dialog, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Chip, ListItemIcon, InputAdornment, Alert, Paper, Typography } from "@mui/material";
import { useEffect, useState, useMemo, useRef } from "react";
import { Add, Search, SwapVert } from "@mui/icons-material";
import { Component } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { createNode } from "./newnode.action";

export function NewNodeCommandPalette(props: {
  components: Component[],
  projectId: string
}) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const selectedItemRef = useRef<HTMLLIElement | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();

  const nodeId = searchParams.get("nodeId");
  const pin = searchParams.get("pin");
  // const configurationId = searchParams.get("configurationId");
  // const connectionId = searchParams.get("connectionId");

  const router = useRouter();

  // Memoize filtered commands
  const filteredComponents = useMemo(() => {
    if (!props.components.length) {
      return props.components.filter(component => component.name.toLowerCase().includes(search.toLowerCase()));
    }
    return props.components.filter(component => component.name.toLowerCase().includes(search.toLowerCase()));
  }, [props.components, search]);

  // Effect to reset selection when filteredCommands change (e.g., due to search)
  useEffect(() => {
    if (filteredComponents.length > 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(-1);
    }
  }, [filteredComponents]);

  // Effect to scroll selected item into view
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const handleComponentSelected = async (component: Component) => {

    if (!nodeId || !pin) {
      const node = await createNode({
        projectId: props.projectId,
        componentId: component.id,
        x: 0,
        y: 0,
        pin: parseInt(pin!)
      });

      if (node.data) {
        router.push(`/project/${props.projectId}`);
        //TODO: Doesn´t close the modal
        //Issue URL: https://github.com/TheLexoPlexx/tracer2/issues/4
      } else {
        setErrorMsg(node.error);
      }

    } else {
      // const node = await createNode({
      //   projectId: props.projectId,
      //   componentId: component.id,
      //   x: 200,
      //   y: 200,
      // });
    }


  };

  const handleKeyDown = (event: React.KeyboardEvent) => {

    if (event.key === "Escape") {
      setSearch("");
      setSelectedIndex(-1);
      router.back();
      return;
    }

    if (!filteredComponents.length && (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Enter")) {
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex(prevIndex => (prevIndex + 1) % filteredComponents.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex(prevIndex => (prevIndex - 1 + filteredComponents.length) % filteredComponents.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredComponents.length) {
        handleComponentSelected(filteredComponents[selectedIndex]);
      }
    }
  };

  return (
    <Dialog open={true} maxWidth="md" fullWidth onClose={() => { router.back() }} slotProps={{
      paper: {
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none"
        }
      }
    }}>
      <Stack spacing={4}>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Neue Node</Typography>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Chip icon={<SwapVert />} variant="outlined" size="small" label="zum navigieren" />
            </Stack>
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <TextField
              fullWidth
              autoFocus
              disabled={props.components.length === 0}
              sx={{ zIndex: 1200 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              slotProps={
                {
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    )
                  }
                }
              }
            />
            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {
                props.components.length > 0 ?
                  filteredComponents.map((component, index) => (
                    <ListItem
                      key={component.name}
                      ref={index === selectedIndex ? selectedItemRef : null}
                      disablePadding
                    >
                      <ListItemButton
                        selected={index === selectedIndex}
                        onClick={() => handleComponentSelected(component)}
                      >
                        <ListItemText primary={component.name} secondary={component.original_part_number} />
                      </ListItemButton>
                    </ListItem>
                  ))
                  :
                  <ListItem>
                    <ListItemButton href="/components">
                      <ListItemIcon>
                        <Add />
                      </ListItemIcon>
                      <ListItemText primary="Keine Komponenten gefunden" secondary="Erstellen Sie eine neue Komponente" />
                    </ListItemButton>
                  </ListItem>
              }
            </List>
          </Stack>
        </Paper>
      </Stack>
    </Dialog>
  );
}