import { AppbarContent } from "@/components/appbar/appbarContent";
import { AppbarLayout } from "@/components/appbar/appbarLayout";
import { ArrowBack, Settings } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Layout(props: {
  children: ReactNode,
  modal: ReactNode,
  params: Promise<{
    id: string
  }>
}) {

  const { id } = await props.params;

  const leftChildren = (
    <IconButton component={Link} href="/" sx={{ color: "white" }}>
      <ArrowBack />
    </IconButton>
  );

  const rightChildren = (
    <IconButton component={Link} href={`/project/${id}/settings`} sx={{ color: "white" }}>
      <Settings />
    </IconButton>
  );

  return (
    <AppbarLayout appbar={<AppbarContent leftChildren={leftChildren} rightChildren={rightChildren} />}>
      {props.children}
      {props.modal}
    </AppbarLayout>
  )
}