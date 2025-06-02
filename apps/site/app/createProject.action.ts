"use server"

import prisma from "@/lib/prismadb"
import { ServerActionResponse } from "@/lib/serverActionUtil"
import { Project } from "@prisma/client"
import { z } from "zod"


const schema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
})

export async function createProject(input: z.infer<typeof schema>): ServerActionResponse<Project> {

  const validated = schema.safeParse(input);

  if (!validated.success) {
    return {
      error: validated.error.message,
      data: null,
    }
  }

  const project = await prisma.project.create({
    data: {
      name: validated.data.name,
      description: validated.data.description,
      configurations: {
        create: {
          name: "Default",
          default: true
        },
      },
    },
  })

  return {
    data: project
  }
}