import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProviderClient } from "./themeProvider";
import { CssBaseline } from "@mui/material";
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

export default function RootLayout(props: {
  children: React.ReactNode
}) {

  return (
    <html lang="de" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProviderClient font={roboto.style.fontFamily}>
            <CssBaseline enableColorScheme />
            <CommandPaletteProvider>
              <ClientLayout>
                {props.children}
              </ClientLayout>
            </CommandPaletteProvider>
          </ThemeProviderClient>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
