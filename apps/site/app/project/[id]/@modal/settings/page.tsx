import { ArrowBack } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { DeleteProject } from "./deleteProjectComp";
import { ConfigurationList } from "./configurationListComp"

export default async function Page(props: {
  params: Promise<{ id: string }>
}) {

  const { id } = await props.params;

  return (
    <Stack direction="column" gap={2} sx={{ p: 2 }}>
      <Stack direction="row" gap={2} sx={{ width: "768px" }}>
        <Tooltip title="Zurück">
          <IconButton href={"/project/" + id}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Typography variant="h4">Einstellungen</Typography>
      </Stack>

      <ConfigurationList projectId={id} />
      <DeleteProject projectId={id} />
    </Stack>
  )
}