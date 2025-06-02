"use server"

import prisma from "@/lib/prismadb";
import { ServerActionResponse } from "@/lib/serverActionUtil";
import { Configuration } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteConfiguration(config_id: string): ServerActionResponse<Configuration> {

  const config = await prisma.configuration.delete({
    where: {
      id: config_id
    },
  });

  if (!config) {
    return {
      error: "Konfiguration konnte nicht gelöscht werden",
      data: null
    }
  } else {
    revalidatePath(`/project/${config.project_id}/settings`);

    return {
      data: config,
    }
  }
}