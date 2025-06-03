"use client"

import { ListItemButton, ListItemIcon, ListItemText, TextField, Popover, Stack, Button, Alert, Snackbar, ListItem, Autocomplete } from "@mui/material";
import { Configuration } from "@prisma/client";
import { useState } from "react";
import { createConfiguration } from "./createConfig.action";
import { updateConfiguration } from "./updateConfig.action";
import { deleteConfiguration } from "./deleteConfig.action";
import { Add, Edit, Lock } from "@mui/icons-material";

type ConfigurationWithInherits = Configuration & {
  inherits_from: Configuration | null
}

export function ConfigurationListItem(props: {
  configuration: ConfigurationWithInherits | undefined,
  projectId: string,
  configurationList: Configuration[]
}) {

  const defaultConfiguration = props.configurationList.find(c => c.default);

  const [name, setName] = useState(props.configuration ? props.configuration.name : "");
  const [inheritsFrom, setInheritsFrom] = useState<Configuration | null>(props.configuration ? props.configuration.inherits_from : defaultConfiguration || null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [popoverError, setPopoverError] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const open = Boolean(anchorEl);

  if (defaultConfiguration == null) {
    return (
      <Alert severity="error">Failed to find default configuration.</Alert>
    )
  }

  if (props.configuration && props.configuration.inherits_from == null) {
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
            secondary={props.configuration ? props.configuration.inherits_from ? props.configuration.inherits_from.name : "" : ""}
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
            <Autocomplete
              options={props.configurationList}
              getOptionLabel={(option) => option.name}
              value={defaultConfiguration}
              renderInput={(params) => <TextField {...params} label="Von Konfiguration erben" />}
              onChange={(event, value) => setInheritsFrom(value)}
            />
            <Stack direction="row" gap={1}>
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
                      project_id: props.projectId,
                      inherits_from_id: inheritsFrom?.id || ""
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