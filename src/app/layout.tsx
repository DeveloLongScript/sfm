"use client"
import "@fontsource/roboto";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

export const metadata = {
  title: "SFM",
  description: "A MIT Licensed file manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
      </body>
    </html>
  );
}