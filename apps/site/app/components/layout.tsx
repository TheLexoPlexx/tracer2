import { ReactNode } from "react";
import { ClientLayout } from "./clientLayout";

export default async function Layout(props: {
  children: ReactNode,
  modal: ReactNode,
  params: Promise<{
    id: string
  }>
}) {

  const { id } = await props.params;

  return (
    <ClientLayout id={id}>
      {props.children}
      {props.modal}
    </ClientLayout>
  )
}