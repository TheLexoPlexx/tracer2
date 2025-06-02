"use server";

import prisma from "@/lib/prismadb";
import { ServerActionResponse } from "@/lib/serverActionUtil";
import { TracerNode } from "@prisma/client";
import { z } from "zod";

const newNodeSchema = z.object({
  projectId: z.string(),
  componentId: z.string(),
  x: z.number(),
  y: z.number(),
})

export async function createNode(tracerNodeInput: z.infer<typeof newNodeSchema>): ServerActionResponse<TracerNode> {

  const validatedFields = connectNewNodeSchema.safeParse(tracerNodeInput);

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


const connectNewNodeSchema = z.object({
  projectId: z.string(),
  componentId: z.string(),
  x: z.number(),
  y: z.number(),
  componentPin: z.string(),
  pin: z.number().min(0),
})

// export async function createNodeWithPin(tracerNodeInput: z.infer<typeof connectNewNodeSchema>): ServerActionResponse<TracerNode> {

//   const validatedFields = connectNewNodeSchema.safeParse(tracerNodeInput);

//   if (!validatedFields.success) {
//     return { error: validatedFields.error.message, data: null };
//   }

//   const node = validatedFields.data;

//   const tracerNode = await prisma.tracerNode.create({
//     data: {
//       project_id: node.projectId,
//       component_id: node.componentId,
//       x: node.x,
//       y: node.y,
//       connections: {
//         create: {
//           pin_number: node.pin,

//         }
//       }
//     }
//   });

//   if (!tracerNode) {
//     return { error: "Failed to create node", data: null };
//   }

//   return { data: tracerNode };
// }
