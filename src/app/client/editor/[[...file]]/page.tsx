"use client";
import React from "react";
import "xterm/css/xterm.css";
import "../../styles/Terminal.css";
import loader from "@monaco-editor/loader";
import { editor } from "monaco-editor";
import "@fontsource/jetbrains-mono";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TitleComponent } from "../../components/TitleComp";
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
var terminalAlreadyThere = false;
const Heading = styled(Typography)(({ theme }) => ({
  margin: "20px 0 10px",
  color: theme.palette.grey[600],
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(11),
  textTransform: "uppercase",
  letterSpacing: ".08rem",
}));

export default function TerminalPage() {
  const [open, setOpen] = useState(false);
  const [diaOpen, setDiaOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isListView, setListView] = useState(false);
  const [openFolderOpen, setOpenFolderOpen] = useState(false);

  return (
    <>
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
                                setOpenFolderOpen(true);
                                popupState.close();
                              }}
                            >
                              <ListItemIcon>
                                <FolderOpenIcon />
                              </ListItemIcon>
                              <ListItemText>Open folder</ListItemText>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Ctrl+Shift+A
                              </Typography>
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                window.location.pathname = "|sfm/plugins";
                                popupState.close();
                              }}
                            >
                              <ListItemIcon>
                                <ExtensionIcon />
                              </ListItemIcon>
                              <ListItemText>Open plugins</ListItemText>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Ctrl+Shift+N
                              </Typography>
                            </MenuItem>
                            <Divider />
                            <Heading sx={{ paddingLeft: 1.5 }}>Program</Heading>
                            <MenuItem>
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
            <IconButton
              color="primary"
              sx={{ px: "8px" }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <SettingsOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <TerminalU />
    </>
  );
}
const TerminalU = () => {
  var [data, setData] = React.useState();
  var name = window.location.pathname.split("/");
  var [savable, setSavable] = React.useState(true);
  name.shift();
  name.shift();
  name.shift();
  var pathname = "/" + name.join("/");
  const [open, setOpen] = React.useState(false);
  var ref: HTMLDivElement | null;
  var prefers = useMediaQuery("(prefers-color-scheme: dark)")
    ? "vs-dark"
    : "vs-light";
  const handleClose = () => {
    setOpen(false);
  };
  var curEditor: editor.IStandaloneCodeEditor;

  React.useEffect(() => {
    loader.init().then((monaco) => {
      curEditor = monaco.editor.create(ref as HTMLDivElement, {
        theme: prefers,
        language: "plain",
        automaticLayout: true,
        value:
          "Loading... \nWhile your waiting maybe give SFM a star at https://github.com/DeveloLongScript/sfm",
      });

      fetch("/api/file-api/fileExist", {
        headers: { "file-exist": decodeURI(pathname) },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.data == true) {
            fetch("/api/file-api/downloadFile", {
              headers: { file: decodeURI(pathname) },
            })
              .then((res) => res.text())
              .then((result) => {
                curEditor.setModel(
                  monaco.editor.createModel(
                    result,
                    undefined,
                    monaco.Uri.file(pathname)
                  )
                );
                setSavable(true);
              });
          } else {
            curEditor.setValue(
              "It looks like the file '" + pathname + "' doesn't exist."
            );
          }
        });
    });
  }, []);

  return (
    // Create a new terminal and set it's ref.
    <div className="insetContents">
      <br />
      <br />
      <br />
      <TitleComponent title={decodeURI(pathname)} caption="editing" />

      <br />
      <Grid container spacing={0.5}>
        <Grid item>
          <IconButton
            color="primary"
            href={"/client/files" + path.resolve(pathname, "../")}
          >
            <ArrowBackOutlineIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            color="primary"
            onClick={() => {
              fetch("/api/file-api/writeFile", {
                headers: {
                  file: decodeURI(pathname),
                  write: btoa(curEditor.getValue()),
                },
              });
            }}
            disabled={!savable}
          >
            <SaveIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <br />
      <div ref={(refa) => (ref = refa)} style={{ height: "70vh" }}></div>
    </div>
  );
};
