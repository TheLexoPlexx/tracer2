import { AlertTitle, Alert, Box, Container } from "@mui/material";
import { ClientPage } from "./client.page";
import prisma from "@/lib/prismadb"
import { ProjectProvider } from "./projectProvider";

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

  const [
    nodes,
    configurations,
    connections
  ] = await Promise.all([
    prisma.node.findMany({
      where: {
        project_id: id
      },
      include: {
        component: true
      }
    }),
    prisma.configuration.findMany({
      where: {
        project_id: id
      },
      orderBy: {
        default: "asc" // this "should" put the one default configuration first
      }
    }),
    prisma.connection.findMany({
      where: {
        OR: [
          {
            node_from: {
              project_id: id
            }
          },
          {
            node_to: {
              project_id: id
            }
          }
        ]
      },
      include: {
        cable: {
          include: {
            colour: true,
            loom: true,
            signal_type: true
          }
        },
        configuration: true,
        node_from: true,
        node_to: true
      }
    })
  ]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <ProjectProvider
        project={project}
        nodes={nodes}
        configurations={configurations}
        connections={connections}
      >
        <ClientPage />
      </ProjectProvider>
    </Box>
  );
}
