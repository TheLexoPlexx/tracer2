import { Divider, List, Stack } from "@mui/material";
import prisma from "@/lib/prismadb";
import { ConfigurationListItem } from "./configurationListItem";

export async function ConfigurationList(props: {
  projectId: string
}) {

  const configurations = await prisma.configuration.findMany({
    where: {
      project_id: props.projectId
    },
    include: {
      inherits_from: true
    }
  });

  return (
    <Stack direction="column" gap={2}>
      <Divider sx={{ my: 2 }}>Konfigurationen</Divider>
      <List disablePadding>
        {
          configurations.map((configuration) => (
            <ConfigurationListItem
              key={configuration.id}
              configuration={configuration}
              projectId={props.projectId}
              configurationList={configurations}
            />
          ))
        }

        <ConfigurationListItem
          key="new"
          configuration={undefined}
          projectId={props.projectId}
          configurationList={configurations}
        />
      </List>
    </Stack>
  );
}