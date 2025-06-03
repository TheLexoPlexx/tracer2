"use server"

import prisma from "@/lib/prismadb";
import { ServerActionResponse } from "@/lib/serverActionUtil";
import { Configuration } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";

const schema = z.object({
  name: z.string().min(1),
  project_id: z.string().min(1),
  inherits_from_id: z.string().min(1)
})

export async function createConfiguration(data: z.infer<typeof schema>): ServerActionResponse<Configuration> {

  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.message,
      data: null
    }
  }

  const config = await prisma.configuration.create({
    data: validatedFields.data,
  });

  if (!config) {
    return {
      error: "Konfiguration konnte nicht erstellt werden",
      data: null
    }
  } else {
    revalidatePath(`/project/${config.project_id}/settings`);
    return {
      data: config,
    }
  }
}