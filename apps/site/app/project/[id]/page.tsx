import { AlertTitle, Alert, Box, Container, Stack } from "@mui/material";
import { Canvas } from "./canvas";
import prisma from "@/lib/prismadb"
import { PageButtonGroup } from "./buttonGroup";

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
          <AlertTitle>Projekt nicht gefunden</AlertTitle>
        </Alert>
      </Container>
    )
  }

  const nodes = await prisma.node.findMany({
    where: {
      project_id: id
    },
    include: {
      component: true
    }
  });

  const configurations = await prisma.configuration.findMany({
    where: {
      project_id: id
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
        <PageButtonGroup id={id} />
      </Stack>

      <Box sx={{ width: "100%", height: "100%" }}>
        <Canvas project={project} nodes={nodes} configurations={configurations} />
      </Box>
    </>
  );
}
