import { ClientLayout } from "./clientLayout";

export default async function Layout(props: { children: React.ReactNode, params: Promise<{ id: string }> }) {

  const { id } = await props.params;

  return (
    <ClientLayout id={id}>
      {props.children}
    </ClientLayout>
  )
}