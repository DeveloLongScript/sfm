"use client";
import BlockIcon from "@mui/icons-material/Block";
import { CssBaseline, Typography, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useMemo } from "react";

var sentences = [
  "Thats a little sad maybe try something else.",
  "Stop and leave me alone.",
  "Is it that hard to get lost?",
  "I feel you, sometimes I get lost too.",
  "Lost? Seriously? Your joking right?",
  "Man, that really sucks.",
  "I seriously have nothing to say.",
  "You did it. You got lost.",
  "Lets play a game of fetch.",
  "Maybe trying harder will help.",
];

export default function PageNotFound() {
  var ref: HTMLSpanElement | null;

  useEffect(() => {
    if (ref !== null) {
      ref.innerHTML = sentences[Math.floor(Math.random() * sentences.length)];
    }
  });

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          margin: 0,
        }}
      >
        <CssBaseline />
        <BlockIcon fontSize="large" />
        <hr
          style={{ border: "1px solid #c1c1c1", width: "calc(100% + 40px)" }}
        />
        <Typography>
          <b>page not found (404): </b>
          <span
            ref={(refreq) => {
              ref = refreq;
            }}
          />
        </Typography>
      </div>
      <div
        style={{
          top: "95%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          margin: 0,
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {"SFM is licensed under the "}
          <Link
            color="inherit"
            href="https://github.com/DeveloLongScript/sfm/blob/main/LICENSE"
          >
            MIT License
          </Link>
        </Typography>
      </div>
    </ThemeProvider>
  );
}
