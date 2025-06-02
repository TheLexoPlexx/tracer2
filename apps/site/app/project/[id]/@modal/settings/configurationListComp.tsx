import { Add, Edit, Lock } from "@mui/icons-material";
import { Divider, List, ListItem, Stack } from "@mui/material";
import prisma from "@/lib/prismadb";
import { ConfigurationListItem } from "./configurationListItem";

export async function ConfigurationList(props: {
  projectId: string
}) {

  const configurations = await prisma.configuration.findMany({
    where: {
      project_id: props.projectId
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
              default={configuration.default}
              projectId={props.projectId}
            />
          ))
        }

        <ConfigurationListItem
          key="new"
          configuration={undefined}
          default={false}
          projectId={props.projectId}
        />
      </List>
    </Stack>
  );
}