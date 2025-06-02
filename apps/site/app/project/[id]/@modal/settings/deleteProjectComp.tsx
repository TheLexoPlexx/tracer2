"use client"

import { Delete } from "@mui/icons-material";
import { Alert, Button, Divider, Stack } from "@mui/material";
import router from "next/router";
import { useState } from "react";
import { deleteProject } from "./deleteProject.action";

export function DeleteProject(props: {
  projectId: string
}) {

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  return (
    <Stack direction="column" gap={2}>
      <Divider sx={{ my: 2 }}>Danger Zone</Divider>
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <Button variant="contained" color="error" loading={loading} startIcon={<Delete />} onClick={async () => {

        // TODO: Make this a beautiful modal
        const confirmed = confirm("Soll das Projekt wirklich gelöscht werden?");

        if (!confirmed) {
          return;
        }

        setLoading(true);

        const response = await deleteProject({ projectId: props.projectId });

        if (response.error) {
          setErrorMsg(response.error);
        } else {
          router.push("/");
        }
      }}>
        Projekt löschen
      </Button>
    </Stack>
  );
}