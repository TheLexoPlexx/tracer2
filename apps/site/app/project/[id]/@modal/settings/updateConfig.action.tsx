"use server"

import prisma from "@/lib/prismadb";
import { ServerActionResponse } from "@/lib/serverActionUtil";
import { Configuration } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";

const schema = z.object({
  name: z.string().min(1)
})

export async function updateConfiguration(config_id: string, data: z.infer<typeof schema>): ServerActionResponse<Configuration> {
  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.message,
      data: null
    }
  }

  const config = await prisma.configuration.update({
    where: {
      id: config_id
    },
    data: validatedFields.data,
  });

  if (!config) {
    return {
      error: "Konfiguration konnte nicht aktualisiert werden",
      data: null
    }
  } else {
    revalidatePath(`/project/${config.project_id}/settings`);

    return {
      data: config,
    }
  }
}