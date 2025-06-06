import { Alert, Container } from "@mui/material";
import prisma from "@/lib/prismadb";
import { Component } from "@prisma/client";
import { ComponentEditComponent } from "./componentEdit";

export async function ComponentEditorPage(props: {
  componentId: string
}) {

  const { componentId } = props;

  let component: Component | null = null;
  let newComponent = false;

  if (componentId === "new") {
    newComponent = true;
    component = {
      id: "",
      name: "",
      pin_count: 0,
      original_part_number: "",
      original_label: ""
    }
  } else {
    component = await prisma.component.findUnique({
      where: {
        id: componentId
      }
    });
  }

  if (!component) {
    return (
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Alert severity="error">Komponente nicht gefunden</Alert>
      </Container>
    );
  }

  return (
    <ComponentEditComponent component={component} newComponent={newComponent} />
  )
}