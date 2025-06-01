"use client"

import { CommandPalette } from "./commandPalette";
export function ClientLayout(props: { children: React.ReactNode }) {

  return (
    <>
      <CommandPalette />
      {props.children}
    </>
  );
}