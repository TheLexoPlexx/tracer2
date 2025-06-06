import { IconButton, Link } from "@mui/material"

import { AppbarLayout } from "@/components/appbar/appbarLayout"
import { AppbarContent } from "@/components/appbar/appbarContent"
import { Home } from "@mui/icons-material"
import { ComponentEditorLayout } from "@/components/componentEditor/componentEditor.layout"
import { ReactNode } from "react"

export default function Layout(props: {
  children: ReactNode
}) {

  const left = (
    <IconButton component={Link} href="/" sx={{ color: "white" }}>
      <Home />
    </IconButton>
  )

  return (
    <AppbarLayout appbar={<AppbarContent leftChildren={left} />}>
      <ComponentEditorLayout>
        {props.children}
      </ComponentEditorLayout>
    </AppbarLayout>
  )
}