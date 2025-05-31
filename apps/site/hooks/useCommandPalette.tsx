"use client"

import { ReactNode, useState, createContext, useContext, useCallback, useEffect, useRef } from 'react';

export interface Command {
  name: string;
  description: string;
  execute: () => void;
}

export interface CommandPaletteContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  commands: Command[];
  setCommands: (commands: Command[]) => void;
  addCommands: (commands: Command[]) => void;
  clearCommands: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);

export function CommandPaletteProvider(props: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [commands, setCommands] = useState<Command[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addCommands = useCallback((commands: Command[]) => {
    setCommands(prevCommands => [...prevCommands, ...commands]);
  }, []);

  const clearCommands = useCallback(() => {
    setCommands([]);
  }, []);

  function handleKeyDown(event: KeyboardEvent) {

    if (event.ctrlKey) {

      switch (event.key) {
        case "k":
          setOpen(!open);
          break;
        default:
          return; // Not an arrow key
      }

      event.preventDefault();

    } else {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen, commands, setCommands, addCommands, clearCommands, inputRef }}>
      {props.children}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette(): CommandPaletteContextType {
  const context = useContext(CommandPaletteContext);
  if (context === undefined) {
    throw new Error('useCommandPalette must be used within an CommandPaletteProvider');
  }
  return context;
} 