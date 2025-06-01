"use server";

import prisma from "@/lib/prismadb";
import { ServerActionResponse } from "@/lib/serverActionUtil";
import { TracerNode } from "@prisma/client";
import { z } from "zod";

const schema = z.object({
  projectId: z.string(),
  componentId: z.string(),
  x: z.number(),
  y: z.number(),
})

export async function createNode(tracerNodeInput: z.infer<typeof schema>): ServerActionResponse<TracerNode> {

  const validatedFields = schema.safeParse(tracerNodeInput);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message, data: null };
  }

  const node = validatedFields.data;

  const tracerNode = await prisma.tracerNode.create({
    data: {
      project_id: node.projectId,
      component_id: node.componentId,
      x: node.x,
      y: node.y,
    }
  });

  if (!tracerNode) {
    return { error: "Failed to create node", data: null };
  }

  return { data: tracerNode };
}
