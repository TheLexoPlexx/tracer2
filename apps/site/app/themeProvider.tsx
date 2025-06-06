"use client"

import { createTheme, ThemeProvider } from "@mui/material";
import { deDE as base_deDE } from "@mui/material/locale";
import { ReactNode } from "react";
import 'dayjs/locale/de';

export function ThemeProviderClient(props: {
  children: ReactNode,
  font: string
}) {

  const theme = createTheme(
    {
      palette: {
      },
      shape: {
        borderRadius: 0
      },
      typography: {
        fontFamily: 'var(--font-roboto)',
      },
      components: {
        MuiStack: {
          defaultProps: {
            useFlexGap: true
          }
        },
        MuiDivider: {
          defaultProps: {
            textAlign: "left"
          }
        }
      }
    },
    base_deDE,
  );

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}