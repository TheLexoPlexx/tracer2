"use server";

import prisma from "@/lib/prismadb";
import { ServerActionResponse } from "@/lib/serverActionUtil";
import { Component } from "@prisma/client";
import z from "zod";

const schema = z.object({
  name: z.string().min(2),
  pin_count: z.number().min(1),
  original_part_number: z.string().optional(),
  original_label: z.string().optional(),
})

export async function upsertComponent(id: string | undefined, component: z.infer<typeof schema>): ServerActionResponse<Component> {

  const validatedFields = schema.safeParse(component);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message, data: null };
  }

  const comp = await prisma.component.upsert({
    where: {
      id: id ?? "new",
    },
    update: validatedFields.data,
    create: validatedFields.data,
  })

  if (!comp) {
    return { error: "Failed to upsert component", data: null };
  }

  return { data: comp };
}

export async function deleteComponent(id: string): ServerActionResponse<Component> {
  const comp = await prisma.component.delete({
    where: {
      id: id,
    },
  })

  if (!comp) {
    return { error: "Failed to delete component", data: null };
  }

  return { data: comp };
}
