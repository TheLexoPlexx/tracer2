"use server";

import prisma from "@/lib/prismadb";
import { ServerActionResponse } from "@/lib/serverActionUtil";
import { Node } from "@prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const newNodeSchema = z.object({
  projectId: z.string(),
  componentId: z.string(),
  x: z.number(),
  y: z.number()
})

export async function createNode(nodeInput: z.infer<typeof newNodeSchema>): ServerActionResponse<Node> {

  const validatedFields = newNodeSchema.safeParse(nodeInput);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message, data: null };
  }

  const nodeData = validatedFields.data;

  const node = await prisma.node.create({
    data: {
      project_id: nodeData.projectId,
      component_id: nodeData.componentId,
      x: nodeData.x,
      y: nodeData.y,
    }
  });

  if (!node) {
    return { error: "Failed to create node", data: null };
  }

  revalidatePath(`/project/${node.project_id}`);

  return { data: node };
}


// const connectNewNodeSchema = z.object({
//   projectId: z.string(),
//   componentId: z.string(),
//   x: z.number(),
//   y: z.number(),
//   componentPin: z.string(),
//   pin: z.number().min(0),
// })

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
