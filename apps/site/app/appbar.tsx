"use client"

import { AppbarAction, AppbarActionPosition, useAppbar } from "@/hooks/useAppbar";
import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import Link from "next/link";
import { SearchBar } from "./searchBar";
import { useCommandPalette } from "@/hooks/useCommandPalette";

export function Appbar() {

  const { appbarActions } = useAppbar();
  const iconElevation = 10;

  const { setOpen } = useCommandPalette();

  //TODO: useAppbar causes layout shift
  //Issue URL: https://github.com/TheLexoPlexx/tracer2/issues/2

  return (
    <AppBar position="fixed">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" gap={2} sx={{ ml: 1, zIndex: (theme) => theme.zIndex.appBar + iconElevation }}>
          {
            appbarActions.filter((action) => action.position === AppbarActionPosition.LEFT).map((action) => (
              <AppbarActionComponent key={action.id} action={action} />
            ))
          }
        </Stack>
        <Toolbar>
          <SearchBar setOpen={setOpen} />
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