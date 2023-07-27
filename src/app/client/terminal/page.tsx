"use client";
import * as socketio from "socket.io-client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Terminal, ITheme } from "xterm";
import "xterm/css/xterm.css";
import loader from "@monaco-editor/loader";
import { editor } from "monaco-editor";
import About from "../components/AboutAlert";
import "@fontsource/jetbrains-mono";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import * as path from "path-browserify";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExtensionIcon from "@mui/icons-material/Extension";
import Stack from "@mui/material/Stack";
import ArrowBackOutlineIcon from "@mui/icons-material/ArrowBackOutlined";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useState } from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import {
  ListItemText,
  Paper,
  IconButton,
  Popper,
  Fade,
  ListItemIcon,
} from "@mui/material/";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import "../styles/Terminal.css";
import "@fontsource/jetbrains-mono";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FitAddon } from "xterm-addon-fit";
import * as FontAddon from "xterm-webfont";
import { WebLinksAddon } from "xterm-addon-web-links";
import { TitleComponent } from "../components/TitleComp";
const Heading = styled(Typography)(({ theme }) => ({
  margin: "20px 0 10px",
  color: theme.palette.grey[600],
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(11),
  textTransform: "uppercase",
  letterSpacing: ".08rem",
}));

var terminalAlreadyThere = false;
export default function TerminalPage() {
  var [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "A") {
        // Run your function here
        event.preventDefault();
        if (searchParams == undefined || searchParams.get("dir") == undefined) {
          window.location.href = "/client/files";
        } else {
          window.location.href = "/client/files" + searchParams.get("dir");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <About setOpen={setOpen} open={open}/>
      <AppBar className="appBar" color="inherit">
        <Toolbar>
          <Stack direction="row" spacing="10px">
            <IconButton color="primary" sx={{ px: "8px" }} href="/client/files">
              <HomeOutlinedIcon fontSize="small" />
            </IconButton>
            <PopupState variant="popper" popupId="demo-popup-popper">
              {(popupState) => (
                <div>
                  <IconButton
                    color="primary"
                    sx={{ px: "8px" }}
                    {...bindToggle(popupState)}
                  >
                    <FileOpenIcon fontSize="small" />
                  </IconButton>
                  <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper
                          sx={(theme) => ({
                            mt: 2,
                            border: "1px solid",
                            borderColor: "grey.200",
                            boxShadow: `0px 4px 20px rgba(170, 180, 190, 0.3)`,
                            maxWidth: "100%",
                            width: 270,
                          })}
                        >
                          <MenuList>
                            <Heading sx={{ paddingLeft: 1.5 }}>Open</Heading>
                            <MenuItem
                              onClick={() => {
                                if (
                                  searchParams == undefined ||
                                  searchParams.get("dir") == undefined
                                ) {
                                  window.location.href = "/client/files";
                                } else {
                                  window.location.href =
                                    "/client/files" + searchParams.get("dir");
                                }
                                popupState.close();
                              }}
                            >
                              <ListItemIcon>
                                <FolderOpenIcon />
                              </ListItemIcon>
                              <ListItemText>Go back to files</ListItemText>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Ctrl+Shift+A
                              </Typography>
                            </MenuItem>
                            <Divider />
                            <Heading sx={{ paddingLeft: 1.5 }}>Program</Heading>
                            <MenuItem onClick={() => {popupState.close(); setOpen(true)}}>
                              <ListItemIcon>
                                <InfoOutlinedIcon />
                              </ListItemIcon>
                              <ListItemText>About SFM</ListItemText>
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                window.close();
                              }}
                            >
                              <ListItemIcon>
                                <CloseIcon />
                              </ListItemIcon>
                              <ListItemText>Close SFM</ListItemText>
                            </MenuItem>
                          </MenuList>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              )}
            </PopupState>
          </Stack>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing="10px">
            <IconButton color="primary" sx={{ px: "8px" }}>
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <TerminalU />
    </>
  );
}
const TerminalU = () => {
  var xtermRef: HTMLDivElement | null;
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetch("/api/user-api/getTerminalToken")
      .then((res) => res.json())
      .then((auth) => {
        if (terminalAlreadyThere == false) {
          terminalAlreadyThere = true;
          if (screen.width <= 840) {
            setOpen(true);
          }
          window.addEventListener(
            "resize",
            function (event) {
              if (screen.width <= 840) {
                setOpen(true);
              }
            },
            true
          );

          var fontaddon = new FontAddon();
          var theme: ITheme = {
            black: "#282c34",
            red: "#e06c75",
            green: "#98c379",
            yellow: "#e5c07b",
            blue: "#61afef",
            magenta: "#c678dd",
            cyan: "#56b6c2",
            white: "#dcdfe4",
            brightBlack: "#282c34",
            brightRed: "#e06c75",
            brightGreen: "#98c379",
            brightYellow: "#e5c07b",
            brightBlue: "#61afef",
            brightMagenta: "#c678dd",
            brightCyan: "#56b6c2",
            brightWhite: "#dcdfe4",
            background: "#191919",
            foreground: "#dcdfe4",
            selectionBackground: "#474e5d",
            cursorAccent: "#a3b3cc",
          };
          // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
          var term = new Terminal({
            fontFamily:
              "SF Mono, Cascadia Code, Fira Mono, courier-new, courier, monospace",
            fontSize: 16,
            fontWeight: 100,
            theme: theme,
          });
          (term as any).open(xtermRef as HTMLDivElement);
          term.loadAddon(new WebLinksAddon());
          term.loadAddon(fontaddon);

          term.onResize((cols, rows) => {
            console.log(cols + ", " + rows);
            socket.emit("resize", cols, rows);
          });
          term.onData((key) => {
            socket.emit("keyPress", key);
          });

          var socket = socketio.connect("ws://localhost:3000");
          console.log(auth.data);
          socket.emit(
            "start",
            searchParams?.get("dir") == undefined
              ? undefined
              : searchParams?.get("dir"),
            auth.data
          );

          socket.on("newOutput", (data) => {
            term.write(data);
          });
        }
      });
  }, []);

  return (
    // Create a new terminal and set it's ref.
    <div style={{ padding: 3 }}>
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Your screen is too small to completely render the terminal."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The screen has been detected to be very small. Your screen cannot
              fully render the terminal.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Okay</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="insetContents">
      <TitleComponent title="Terminal" caption="builtin" />
      </div><br />
      <div className="term">
        <div
          ref={(ref) => {
            xtermRef = ref;
          }}
          className="inner"
        />
      </div>
    </div>
  );
};
