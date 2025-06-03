"use server"

import { ServerActionResponse } from "@/lib/serverActionUtil";
import { z } from "zod";
import prisma from "@/lib/prismadb";

const schema = z.object({
  projectId: z.string(),
});

export async function deleteProject(input: z.infer<typeof schema>): ServerActionResponse<void> {

  const validated = schema.safeParse(input);

  if (!validated.success) {
    return {
      error: validated.error.message,
      data: null,
    }
  }

  const configurations = await prisma.configuration.deleteMany({
    where: {
      project_id: validated.data.projectId,
    },
  });

  if (!configurations) {
    return {
      error: "Konfigurationen konnten nicht gelöscht werden",
      data: null,
    }
  }

  const nodes = await prisma.node.deleteMany({
    where: {
      project_id: validated.data.projectId,
    },
  });

  if (!nodes) {
    return {
      error: "Nodes konnten nicht gelöscht werden",
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