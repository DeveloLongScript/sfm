"use client";
import "@fontsource/roboto";
import "@fontsource/nunito-sans";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(
    "%cSFM is licensed under the MIT License",
    "font-size: 28px; color: #cc00ff; font-weight: bold;"
  );
  console.log(
    "%cFor more info go to https://github.com/DeveloLongScript/sfm/blob/main/LICENSE",
    "font-size: 22px; color: #cc00ff"
  );
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#505b96",
            dark: "#16288a",
          },
          secondary: {
            main: "#00225c",
            dark: "#0039a0",
          },
          divider: "rgba(154,154,154,0.12)",
          success: {
            main: "#182f19",
          },
        },
        typography: {
          fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiButtonBase: {
            defaultProps: { disableRipple: true },
          },
          MuiTooltip: {
            defaultProps: { arrow: false },
          },
          MuiAppBar: {
            defaultProps: { color: "secondary" },
          },
        },
        overrides: {
          MuiSwitch: {
            root: {
              width: 42,
              height: 26,
              padding: 0,
              margin: 8,
            },
            switchBase: {
              padding: 1,
              "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
                transform: "translateX(16px)",
                color: "#fff",
                "& + $track": {
                  opacity: 1,
                  border: "none",
                },
              },
            },
            thumb: {
              width: 24,
              height: 24,
            },
            track: {
              borderRadius: 13,
              border: "1px solid #bdbdbd",
              backgroundColor: "#fafafa",
              opacity: 1,
              transition:
                "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            },
          },
        },
        shape: {
          borderRadius: 0,
        },
      }),
    [prefersDarkMode]
  );

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
