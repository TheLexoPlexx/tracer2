"use server"

import { ServerActionResponse } from "@/lib/serverActionUtil";
import { z } from "zod";
import prisma from "@/lib/prismadb";

const schema = z.object({
  projectId: z.string(),
});

export async function deleteProjectAction(input: z.infer<typeof schema>): ServerActionResponse<void> {

  const validated = schema.safeParse(input);

  if (!validated.success) {
    return {
      error: validated.error.message,
      data: null,
    }
  }

  const project = await prisma.project.delete({
    where: {
      id: validated.data.projectId,
    },
  });

  if (!project) {
    return {
      error: "Projekt nicht gefunden, löschen nicht möglich.",
      data: null,
    };
  }

  return {
    error: undefined,
    data: null,
  };
}