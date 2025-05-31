import { Command } from "@/hooks/useCommandPalette";

export const commands: Command[] = [
  {
    id: "new-node",
    name: "Neue Node",
    description: "Erstellt eine neue Node",
    execute: () => {
      console.log("neue node jetzt");
    }
  },
  {
    id: "component-library",
    name: "Komponentenbibliothek",
    description: "Öffnet die Komponentenbibliothek",
    execute: () => {
      console.log("komponentenbibliothek jetzt");
    }
  }
];
