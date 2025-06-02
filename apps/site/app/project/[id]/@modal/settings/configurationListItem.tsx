"use client"

import { ListItemButton, ListItemIcon, ListItemText, TextField, Popover, Stack, Button, Alert, Snackbar, ListItem } from "@mui/material";
import { Configuration } from "@prisma/client";
import { useState } from "react";
import { createConfiguration } from "./createConfig.action";
import { updateConfiguration } from "./updateConfig.action";
import { deleteConfiguration } from "./deleteConfig.action";
import { Add, Edit, Lock } from "@mui/icons-material";

export function ConfigurationListItem(props: {
  configuration: Configuration | undefined,
  default: boolean,
  projectId: string
}) {

  const [name, setName] = useState(props.configuration ? props.configuration.name : "");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [popoverError, setPopoverError] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const open = Boolean(anchorEl);

  if (props.default && props.configuration) {
    return (
      <ListItem disablePadding>
        <ListItemButton disabled>
          <ListItemIcon><Lock /></ListItemIcon>
          <ListItemText
            primary={props.configuration.name}
          />
        </ListItemButton>
      </ListItem>
    )
  } else {
    return (
      <ListItem disablePadding>
        <ListItemButton onClick={(e: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(e.currentTarget as HTMLButtonElement);
        }}>
          <ListItemIcon>
            {
              props.configuration ? (
                <Edit />
              ) : (
                <Add />
              )
            }
          </ListItemIcon>
          <ListItemText
            primary={props.configuration ? props.configuration.name : "Neue Konfiguration"}
          />
        </ListItemButton>

        <Popover
          open={open}
          onClose={() => {
            setAnchorEl(null)
            setPopoverError(null)
          }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <Stack direction="column" gap={1} sx={{ p: 1 }}>
            {
              popoverError && (
                <Alert severity="error" sx={{ width: "sm" }}>{popoverError}</Alert>
              )
            }
            {
              snackbarMessage && (
                <Snackbar
                  open={!!snackbarMessage}
                  autoHideDuration={6000}
                  onClose={() => setSnackbarMessage(null)}
                  message={snackbarMessage}
                />
              )
            }
            <Stack direction="row" gap={1} sx={{ p: 1 }}>
              <TextField fullWidth size="small" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Button
                variant="contained"
                size="small"
                sx={{
                  width: "fit-content"
                }}
                onClick={async () => {
                  setLoading(true)

                  if (props.configuration === undefined) {
                    const res = await createConfiguration({
                      name,
                      project_id: props.projectId
                    })

                    if (res.error) {
                      setPopoverError(res.error)
                    } else {
                      setAnchorEl(null)
                      setSnackbarMessage("Konfiguration erfolgreich erstellt")
                    }

                  } else {
                    const res = await updateConfiguration(props.configuration.id, {
                      name
                    })

                    if (res.error) {
                      setPopoverError(res.error)
                    } else {
                      setAnchorEl(null)
                      setSnackbarMessage("Konfiguration erfolgreich aktualisiert")
                    }
                  }

                  setLoading(false)
                }}>Speichern</Button>
              {
                props.configuration && (
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    sx={{
                      width: "fit-content"
                    }}
                    onClick={async () => {
                      if (!props.configuration) {
                        return
                      }

                      setLoading(true)

                      const res = await deleteConfiguration(props.configuration.id)

                      if (res.error) {
                        setPopoverError(res.error)
                      } else {
                        setAnchorEl(null)
                        setSnackbarMessage("Konfiguration erfolgreich gelöscht")
                      }

                      setLoading(false)
                    }}>Löschen</Button>
                )
              }
            </Stack>
          </Stack>
        </Popover>
      </ListItem>
    )
  }
}