import { Container, Typography } from "@mui/material";

export default async function Page() {

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Typography variant="h6">Komponenten</Typography>
    </Container>
  );
}