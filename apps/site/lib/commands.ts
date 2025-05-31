"use client"

import { Command } from "@/hooks/useCommandPalette";

export type CommandId = "home" | "component-library";

export const commands: Record<CommandId, Command> = {
  "home": {
    name: "Startseite",
    description: "Öffnet die Startseite",
    directUrl: "/"
  },
  "component-library": {
    name: "Komponentenbibliothek",
    description: "Öffnet die Komponentenbibliothek",
    directUrl: "/components"
  }
};


export const newNodeCommand: Command = {
  name: "Neue Node",
  description: "Erstellt eine neue Node",
  pathname: "/new-node"
}