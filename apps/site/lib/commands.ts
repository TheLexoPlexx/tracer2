"use client"

import { Command } from "@/hooks/useCommandPalette";

export type CommandId = "new-node" | "component-library";

export const commands: Record<string, Command> = {
  "new-node": {
    name: "Neue Node",
    description: "Erstellt eine neue Node",
    execute: async () => {
      console.log("new-node");
    }
  },
  "component-library": {
    name: "Komponentenbibliothek",
    description: "Öffnet die Komponentenbibliothek",
    execute: async () => {
      console.log("component-library");
    }
  }
};
