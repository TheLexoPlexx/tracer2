"use client"

import { Command, useCommandPalette } from "@/hooks/useCommandPalette";
import { Dialog, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Chip } from "@mui/material";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { SwapVert } from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { commands } from "@/lib/commands";
export function CommandPalette() {
  const [search, setSearch] = useState("");
  const cp = useCommandPalette();
  const [selectedCommandIndex, setSelectedCommandIndex] = useState<number>(-1);
  const selectedItemRef = useRef<HTMLLIElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // Memoize filtered commands
  const filteredCommands = useMemo(() => {
    if (!cp.commands.length) {
      return cp.commands.filter(command => command.name.toLowerCase().includes(search.toLowerCase()));
    }
    return cp.commands.filter(command => command.name.toLowerCase().includes(search.toLowerCase()));
  }, [cp.commands, search]);

  // Effect to add commands once on mount
  useEffect(() => {
    if (cp.commands.length === 0) {
      cp.setCommands(Object.values(commands));
    }
  }, [cp.setCommands, cp.commands.length]);

  // Effect to reset selection when filteredCommands change (e.g., due to search)
  useEffect(() => {
    if (filteredCommands.length > 0) {
      setSelectedCommandIndex(0);
    } else {
      setSelectedCommandIndex(-1);
    }
  }, [filteredCommands]);

  // Effect to handle dialog open/close state
  useEffect(() => {
    if (cp.open) {
      // When dialog opens, selection is handled by the effect above based on filteredCommands.
      // Input focus is handled by autoFocus on TextField.
    } else {
      // When dialog closes
      setSearch(""); // Clear search
      setSelectedCommandIndex(-1); // Reset selection
    }
  }, [cp.open]);

  // Effect to scroll selected item into view
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedCommandIndex]);

  const handleCommandExecution = (command: Command) => {
    cp.setOpen(false); // This will trigger the useEffect for !cp.open to reset search/selection

    if (command.execute) {
      command.execute()
    } else if (command.pathname) {
      router.push(pathname + command.pathname)
    } else if (command.directUrl) {
      router.push(command.directUrl)
    } else {
      console.error("Command has no execute or pathname")
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!filteredCommands.length && (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Enter")) {
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedCommandIndex(prevIndex => (prevIndex + 1) % filteredCommands.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedCommandIndex(prevIndex => (prevIndex - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedCommandIndex >= 0 && selectedCommandIndex < filteredCommands.length) {
        handleCommandExecution(filteredCommands[selectedCommandIndex]);
      }
    }
  };

  return (
    <Dialog open={cp.open} maxWidth="md" fullWidth onClose={() => cp.setOpen(false)}>
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Chip icon={<SwapVert />} variant="outlined" size="small" label="zum navigieren" />
        </Stack>
        <TextField
          fullWidth
          ref={cp.inputRef}
          autoFocus
          sx={{ zIndex: 1200 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <List sx={{ maxHeight: 300, overflow: 'auto' }}>
          {
            filteredCommands.map((command, index) => (
              <ListItem
                key={command.name}
                ref={index === selectedCommandIndex ? selectedItemRef : null}
                disablePadding
              >
                <ListItemButton
                  selected={index === selectedCommandIndex}
                  onClick={() => handleCommandExecution(command)}
                >
                  <ListItemText primary={command.name} secondary={command.description} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Stack>
    </Dialog>
  );
}