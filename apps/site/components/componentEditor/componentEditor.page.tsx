import { Container, Typography } from "@mui/material";

export async function ComponentEditorPage() {

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Typography variant="h6">Komponenten</Typography>
    </Container>
  );
}