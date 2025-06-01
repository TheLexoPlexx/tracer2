import { ReactNode } from "react";
import { ClientLayout } from "./layout.client";

export default async function Layout(props: {
  children: ReactNode,
  modal: ReactNode,
  params: Promise<{
    id: string
  }>
}) {

  return (
    <ClientLayout>
      {props.children}
      {props.modal}
    </ClientLayout>
  )
}