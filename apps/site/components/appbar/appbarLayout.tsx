import { Stack, AppBar, Box } from "@mui/material"
import { ReactNode } from "react"

export function AppbarLayout(props: {
  children: ReactNode,
  appbar: ReactNode
}) {
  return (

    <Stack sx={{ height: "100vh" }}>
      <AppBar position="fixed">
        {props.appbar}
      </AppBar>
      <Box sx={{ marginTop: "64px", height: "100%", boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.5)" }}>
        {props.children}
      </Box>
    </Stack>
  )
}