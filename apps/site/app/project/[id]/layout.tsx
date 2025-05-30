import { ReactNode } from "react";
import { ClientLayout } from "./clientLayout";

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