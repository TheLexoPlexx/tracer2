import { Colour } from "@prisma/client";

export function cableColourBackground(colors: Colour[]) {

  const angle = 15;
  const gradient = colors.map((color, index) => {
    return `${color} ${index * 10}px`;
  }).join(", ");

  return `repeating-linear-gradient(${angle}deg, ${gradient})`;
}