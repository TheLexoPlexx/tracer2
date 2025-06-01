import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProviderClient } from "./themeProvider";
import { Box, CssBaseline, Stack } from "@mui/material";
import { Appbar } from "./appbar";
import { AppbarProvider } from "@/hooks/useAppbar";
import { CommandPaletteProvider } from "@/hooks/useCommandPalette";
import { ClientLayout } from "./layout.client";

const roboto = Roboto({
  fallback: ["serif"],
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Tracer",
};

export default function RootLayout(props: { children: React.ReactNode }) {

  return (
    <html lang="de" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProviderClient font={roboto.style.fontFamily}>
            <CssBaseline enableColorScheme />
            <AppbarProvider>
              <CommandPaletteProvider>
                <ClientLayout>
                  <Stack sx={{ height: "100vh" }}>
                    <Appbar />
                    <Box sx={{ marginTop: "64px", height: "100%", boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.5)" }}>
                      {props.children}
                    </Box>
                  </Stack>
                </ClientLayout>
              </CommandPaletteProvider>
            </AppbarProvider>
          </ThemeProviderClient>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
