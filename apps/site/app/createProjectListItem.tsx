"use client"

import { Add } from "@mui/icons-material";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useState } from "react";
import { createProject } from "./createProject.action";
import { useRouter } from "next/navigation";

export default function AddProjectListItem() {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const router = useRouter();

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => {
          setDialogOpen(true);
        }}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Neues Projekt" />
        </ListItemButton>
      </ListItem>
      <Dialog open={dialogOpen} fullWidth onClose={() => setDialogOpen(false)}>
        <DialogTitle>Neues Projekt</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Divider />
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          <TextField label="Name" fullWidth value={name} onChange={(e) => {
            if (description === "" || description === name) {
              setName(e.target.value)
              setDescription(e.target.value)
            }
          }} />
          <TextField label="Beschreibung" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Abbrechen</Button>
          <Button onClick={async () => {
            setDialogOpen(false);

            const res = await createProject({ name, description });

            if (res.error) {
              setErrorMsg(res.error);
            }

            if (res.data) {
              router.push(`/project/${res.data.id}`);
            }
          }}>Erstellen</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}