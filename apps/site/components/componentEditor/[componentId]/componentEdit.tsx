"use client"

import { Delete, Save } from "@mui/icons-material"
import { Alert, Container, Typography, Stack, TextField, Button, Snackbar } from "@mui/material"
import { Component } from "@prisma/client";
import { useState } from "react";
import { deleteComponent, upsertComponent } from "./component.action";
import { useRouter } from "next/navigation";

export function ComponentEditComponent(props: {
  component: Component,
  newComponent: boolean
}) {

  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [successMsg, setSuccessMsg] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { component, newComponent } = props;

  const [name, setName] = useState(component.name);
  const [pinCount, setPinCount] = useState(component.pin_count);
  const [originalPartNumber, setOriginalPartNumber] = useState(component.original_part_number);
  const [originalLabel, setOriginalLabel] = useState(component.original_label);

  const router = useRouter();

  async function handleDelete() {
    setDeleting(true);
    const response = await deleteComponent(component.id);

    if (response.data) {
      setSuccessMsg("Komponente wurde gelöscht");
      router.push(`/components`);
    } else {
      setErrorMsg(response.error);
    }
  }

  async function handleSave() {
    setSaving(true);

    const response = await upsertComponent(
      newComponent ? undefined : component.id,
      {
        name: name,
        pin_count: pinCount,
        original_part_number: originalPartNumber ?? undefined,
        original_label: originalLabel ?? undefined
      }
    )

    if (response.data) {
      setSuccessMsg("Komponente wurde gespeichert");
      router.push(`/components/${response.data.id}`);
    } else {
      setErrorMsg(response.error);
    }
    setSaving(false);
  }

  return (
    <Container sx={{ height: "100vh", p: 2 }} component="form">
      <Typography variant="h6">{newComponent ? "Neue Komponente" : component.name}</Typography>
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {<Snackbar open={successMsg !== undefined} autoHideDuration={3000} onClose={() => setSuccessMsg(undefined)} message={successMsg} />}
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={2} sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            type="number"
            label="Pin Count"
            value={pinCount}
            onChange={(e) => setPinCount(parseInt(e.target.value))}
          />
        </Stack>
        <TextField
          fullWidth
          label="Original Part Number"
          value={originalPartNumber}
          onChange={(e) => setOriginalPartNumber(e.target.value)}
        />

        <TextField
          fullWidth
          label="Original Label"
          value={originalLabel}
          onChange={(e) => setOriginalLabel(e.target.value)}
        />
        <Stack direction="row" spacing={2} sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="error" startIcon={<Delete />} disabled={newComponent} loading={deleting} fullWidth type="submit" onClick={handleDelete}>Löschen</Button>
          <Button variant="contained" color="primary" startIcon={<Save />} loading={saving} fullWidth type="submit" onClick={handleSave}>Speichern</Button>
        </Stack>
      </Stack>
    </Container>
  )
}