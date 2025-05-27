import { AlertTitle, Alert, Box, Button, ButtonGroup, Container, Paper, Stack, Typography } from "@mui/material";
import { Canvas } from "./canvas";
import prisma from "@/lib/prismadb"
import { Add } from "@mui/icons-material";

export default async function Page(props: { params: Promise<{ id: string }> }) {

  const { id } = await props.params;

  const project = await prisma.project.findUnique({
    where: {
      id: id
    }
  });

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Alert severity="error">
          <AlertTitle>
            Project not found
          </AlertTitle>
        </Alert>
      </Container>
    )
  }

  const nodes = await prisma.tracerNode.findMany({
    where: {
      project_id: id
    },
    include: {
      component: true
    }
  });


  return (
    <>
      <Stack sx={{
        position: 'absolute',
        top: '100px',
        left: "0",
        right: "0",
        margin: '0 auto',
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ButtonGroup variant="outlined" sx={{ backgroundColor: 'background.paper', position: 'absolute' }}>
          <Button startIcon={<Add />}>Bauteil</Button>
          <Button startIcon={<Add />} disabled>Kabel</Button>
        </ButtonGroup>

      </Stack>

      <Box sx={{ width: "100%", height: "100%" }}>
        <Canvas project={project} nodes={nodes} />
      </Box>
    </>
  );
}
