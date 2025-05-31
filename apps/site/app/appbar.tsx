"use client"

import { AppbarAction, AppbarActionPosition, useAppbar } from "@/hooks/useAppbar";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function Appbar() {

  const { appbarActions, appbarTitle, appbarTitleElement } = useAppbar();
  const iconElevation = 10;

  return (
    <AppBar position="fixed" sx={{}}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" gap={2} sx={{ ml: 1, zIndex: (theme) => theme.zIndex.appBar + iconElevation }}>
          {
            appbarActions.filter((action) => action.position === AppbarActionPosition.LEFT).map((action) => (
              <AppbarActionComponent key={action.id} action={action} />
            ))
          }
        </Stack>
        <Toolbar>
          {appbarTitleElement}
          {!appbarTitleElement && <Typography variant="h6" sx={{ fontWeight: "bold", fontStyle: "italic" }}>{appbarTitle.toUpperCase()}</Typography>}
        </Toolbar>
        <Stack direction="row" alignItems="center" gap={2} sx={{ mr: 1, zIndex: (theme) => theme.zIndex.appBar + iconElevation }}>
          {
            appbarActions.filter((action) => action.position === AppbarActionPosition.RIGHT).map((action) => (
              <AppbarActionComponent key={action.id} action={action} />
            ))
          }
        </Stack>
      </Stack>
    </AppBar>
  )
}

function AppbarActionComponent(props: { action: AppbarAction }) {

  const componentProps = props.action.href ? { component: Link, href: props.action.href, passHref: true } : { onClick: props.action.onClick };
  return (
    <Button key={props.action.id} {...componentProps}>
      {props.action.icon}
    </Button>
  )
}