import { Outlet } from "react-router-dom";
import "../styles/App.css";
import { ThemeProvider } from "@emotion/react";
import { brandingDarkTheme } from "./theme";
import "@fontsource/ibm-plex-sans";
import "@fontsource/plus-jakarta-sans";
import FadeIn from "react-fade-in";

export default function Layout() {
  return (
    <ThemeProvider theme={brandingDarkTheme}>
      <FadeIn
        className={(Math.random() * Math.random()).toString() + "-fadein"}
      >
        <Outlet />
      </FadeIn>
    </ThemeProvider>
  );
}
