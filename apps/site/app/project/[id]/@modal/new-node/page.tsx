import { NewNodeCommandPalette } from "./page.client";
import prisma from "@/lib/prismadb"

export default async function Page() {

  const components = await prisma.component.findMany() || [];

  return (
    <NewNodeCommandPalette components={components} />
  );
}