import { Container, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import prisma from "@/lib/prismadb"
import AddProjectListItem from "./createProjectListItem";
import Link from "next/link";
export default async function Page() {

  const projects = await prisma.project.findMany();

  return (
    <Container sx={{ height: '100vh', width: '100vw' }}>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
        <Typography variant="h4">Projekte</Typography>
        <List disablePadding>
          {
            projects.map((project) => (
              <ListItem key={project.id} disablePadding>
                <ListItemButton component={Link} href={`/project/${project.id}`}>
                  <ListItemText primary={project.name} secondary={project.description} />
                </ListItemButton>
              </ListItem>
            ))
          }
          <AddProjectListItem />
        </List>
      </Paper>
    </Container>
  );
}

