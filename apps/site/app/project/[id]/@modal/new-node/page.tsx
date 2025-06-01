import { NewNodeCommandPalette } from "./page.client";
import prisma from "@/lib/prismadb"

export default async function Page(props: {
  params: Promise<{
    id: string
  }>
}) {

  const { id } = await props.params;
  const components = await prisma.component.findMany() || [];

  return (
    <NewNodeCommandPalette components={components} projectId={id} />
  );
}