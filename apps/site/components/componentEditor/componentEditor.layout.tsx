import { ReactNode } from "react";
import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import prisma from "@/lib/prismadb";

export async function ComponentEditorLayout(props: {
  children: ReactNode
}) {

  const components = await prisma.component.findMany();

  return (
    <Stack direction="row">
      <Container sx={{ maxHeight: "100vh", overflow: "auto" }} disableGutters>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton href="/components/new">
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="Neue Komponente" />
            </ListItemButton>
          </ListItem>
          {
            components.map((component) => (
              <ListItem disablePadding key={component.id}>
                <ListItemButton href={`/components/${component.id}`}>
                  <ListItemText primary={component.name} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Container>
      {props.children}
    </Stack>
  )
}