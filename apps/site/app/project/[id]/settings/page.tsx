"use client"

import { ArrowBack, Delete } from "@mui/icons-material";
import { Alert, Box, Button, Container, Divider, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { deleteProjectAction } from "./deleteProjectAction";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Stack direction="row" gap={2}>
          <Tooltip title="Zurück">
            <IconButton href={"/project/" + params.id}>
              <ArrowBack />
            </IconButton>
          </Tooltip>
          <Typography variant="h4">Einstellungen</Typography>
        </Stack>

        <Divider sx={{ my: 2 }}>Danger Zone</Divider>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <Button variant="contained" color="error" loading={loading} startIcon={<Delete />} onClick={async () => {

          setLoading(true);

          const id = params.id as string;

          const response = await deleteProjectAction({ projectId: id });

          if (response.error) {
            setErrorMsg(response.error);
          } else {
            router.push("/");
          }
        }}>
          Projekt löschen
        </Button>
      </Paper>
    </Container>
  )
}