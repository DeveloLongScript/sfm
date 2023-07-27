"use client";
import { TitleComponent } from "../../components/TitleComp";
import AppBar from "@mui/material/AppBar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material/";
import mime from "mime";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Skeleton } from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExtensionIcon from "@mui/icons-material/Extension";
import Stack from "@mui/material/Stack";
import TerminalIcon from "@mui/icons-material/Terminal";
import Avatar from "@mui/material/Avatar";
import { join, resolve } from "path-browserify";
import useFetch from "react-fetch-hook";
import { DataGrid } from "@mui/x-data-grid";
import MenuList from "@mui/material/MenuList";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderIcon from "@mui/icons-material/Folder";
import LinearProgress from "@mui/material/LinearProgress";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import {
  Link,
  Box,
  Alert,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Grid,
  Paper,
  IconButton,
  Popper,
  Fade,
  ListItemIcon,
  Autocomplete,
  Menu,
  MenuItem,
} from "@mui/material/";
import "../../styles/Files.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import Slide from "@mui/material/Slide";
import { Toaster, toast } from "react-hot-toast";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import FadeIn from "react-fade-in";
import { Buffer } from "buffer";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import ToggleButton from "@mui/material/ToggleButton";
import InputBase from "@mui/material/InputBase";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { styled, alpha } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DialogContentText from "@mui/material/DialogContentText";
import AlertTitle from "@mui/material/AlertTitle";
import Crop54Icon from "@mui/icons-material/Crop54";
import ViewListIcon from "@mui/icons-material/ViewList";
import List from "@mui/material/List";
import { TransitionProps } from "@mui/material/transitions";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import DialogTitle from "@mui/material/DialogTitle";
import About from "../../components/AboutAlert";
import { LanguageVariant } from "typescript";
import internal from "stream";

var name = window.location.pathname.split("/");
name.shift();
name.shift();
name.shift();

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

var pathname = "/" + name.join("/");

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  margin: "20px 0 10px",
  color: theme.palette.grey[600],
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(11),
  textTransform: "uppercase",
  letterSpacing: ".08rem",
}));

var refreshFunc = () => {};

const IconToggleButton = styled(ToggleButton)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  "& > *": {
    marginRight: "8px",
  },
});

/**
 * this is a boilerplate template thing because
 * theres a bug in react that sometimes my dialogs dont show
 * but it fixes it self with two dialogs.*/
function FullScreenDialog(props: {
  open: boolean;
  setOpen: (b: boolean) => void;
}) {
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Hold on....
            </Typography>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
}

function DragAndDropZone() {
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  var lastTarget: EventTarget | null = null;

  window.addEventListener("drop", (e) => {
    setUploadDialogVisible(false);
    e.preventDefault();

    toast.promise(
      new Promise((good, bad) => {
        for (var elm in e.dataTransfer?.items) {
          var maxBase64 = 1048576;
          var windowUrl = window.URL || window.webkitURL;

          if (
            e.dataTransfer?.files[parseInt(elm)].length > maxBase64 &&
            typeof windowUrl.createObjectURL === "function"
          ) {
            var blob = new Blob([e.dataTransfer?.files[parseInt(elm)]], {
              type: e.dataTransfer?.files[parseInt(elm)].type,
            });
            var url = windowUrl.createObjectURL(blob);

            fetch("/api/file-api/uploadFile", {
              headers: {
                url: url,
                name: e.dataTransfer?.files[parseInt(elm)].name,
                dir: pathname,
              },
            })
              .then(() => {
                good("");
              })
              .catch(() => bad());
          } else {
            var link =
              "data:" +
              mime.getType(e.dataTransfer?.files[parseInt(elm)].name) +
              ";base64," +
              Buffer.from(elm, "utf8").toString("base64");
            console.log({
              url: link,
              name: e.dataTransfer?.files[parseInt(elm)].name,
              dir: pathname,
            });
            fetch("/api/file-api/uploadFile", {
              headers: {
                url: link,
                name: e.dataTransfer?.files[parseInt(elm)].name,
                dir: pathname,
              },
            })
              .then(() => {
                good("");
              })
              .catch(() => bad());
          }
        }
      }),
      {
        success: "Done uploading.",
        error: "Error uploading file.",
        loading: "Uploading...",
      }
    );
  });
  window.addEventListener("dragleave", (e) => {
    if (e.target === document || e.target === lastTarget) {
      setUploadDialogVisible(false);
    }
  });
  window.addEventListener("dragenter", (e) => {
    if (isFile(e)) {
      lastTarget = e.target;
      setUploadDialogVisible(true);
    }
  });

  window.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  return (
    <Dialog
      open={uploadDialogVisible}
      maxWidth="xl"
      fullWidth={true}
      onClose={() => {
        setUploadDialogVisible(false);
      }}
    >
      <DialogTitle>Upload file...</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Stop holding the left click button to upload the file into SFM.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
function isFile(evt: any) {
  var dt = evt.dataTransfer;

  for (var i = 0; i < dt.types.length; i++) {
    if (dt.types[i] === "Files") {
      return true;
    }
  }
  return false;
}

export default function directory({ params }: { params: { dir: string } }) {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [diaOpen, setDiaOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isListView, setListView] = useState(false);

  const [searchVis, setSearchVis] = useState(false);
  const openSearchDialog = () => {
    setSearchVis(true);
  };
  var dirRef: HTMLDivElement | null;
  const [fieldError, setFieldError] = useState(false);
  const [openFolderOpen, setOpenFolderOpen] = useState(false);
  console.log(pathname);
  fetch("/api/setup-api/isSetupYet").then((data) => {
    data.json().then((realdata) => {
      if ((realdata as any).data == false) {
        window.location.pathname = "/";
      } else {
        setOpen(false);
      }
    });
  });
  refreshFunc = () => {
    useEffect(() => {
      setRefresh(true);
      setRefresh(false);
    });

    console.log("hello");
  };
  fetch("/api/user-api/getPerms")
    .then((data) => data.json())
    .then((perms) => {
      console.log(perms.data as string);
      if ((perms.data as string).includes("A")) {
        setAuthenticated(true);
      } else {
        if ((perms.data as string).includes("T")) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      }
    });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "A") {
        // Run your function here
        event.preventDefault();
        setOpenFolderOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const closeSettings = () => {
    setOpen(false);
  };

  const ListComp = () => {
    const { isLoading, data } = useFetch(`/api/file-api/dirExist`, {
      headers: { "dir-exist": decodeURI(pathname) },
    });
    const rand = Math.floor(Math.random() * 3);

    if (isLoading === true || data === undefined) {
      return (
        <>
          <br />
          <FullScreenDialog setOpen={setSearchVis} open={searchVis} />
          {[...Array(rand)].map((e, i) => (
            <Box>
              <Skeleton variant="rounded" height={48} animation="wave" />
              <br />
              <Skeleton variant="rounded" height={48} animation="wave" />
              <br />
              <Skeleton variant="rounded" height={48} animation="wave" />
              {rand == 2 && <br />}
            </Box>
          ))}
          {rand == 0 && (
            <Box>
              <Skeleton variant="rounded" height={48} animation="wave" />
              <br />
              <Skeleton variant="rounded" height={48} animation="wave" />
              <br />
              <Skeleton variant="rounded" height={48} animation="wave" />
            </Box>
          )}
        </>
      );
    }
    return (
      <FadeIn
        className={(Math.random() * Math.random()).toString() + "-fadein"}
      >
        <DragAndDropZone />
        <div style={{ display: "none" }}>{refresh}</div>
        <title>{pathname} - SFM</title>
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              fontFamily:
                "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
            },
          }}
        />
        <div>
          {((data as any).data && (
            <div>
              <br />
              <ListAllFiles dir={decodeURI(window.location.pathname)} />
            </div>
          )) || (
            <div>
              <br />
              <Typography variant="body1">
                It looks like the directory you are looking at doesn't exist.
              </Typography>
              <br />
              <br />
              <Typography>
                <Link href="/client/files/">Go back home</Link>
              </Typography>
            </div>
          )}
        </div>
      </FadeIn>
    );
  };
  return (
    <div>
      <Dialog
        open={searchVis}
        fullScreen
        onClose={() => {
          setSearchVis(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setSearchVis(false);
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Search
            </Typography>
          </Toolbar>
        </AppBar>
        <SearchList pattern={searchKeyword} />
      </Dialog>
      <About setOpen={setAboutOpen} open={aboutOpen} />
      <div>
        <Dialog
          open={openFolderOpen}
          onClose={() => {
            setOpenFolderOpen(false);
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
              }}
            >
              <Typography variant="body1" fontWeight="500">
                Open Folder
              </Typography>
              <IconButton
                onClick={() => {
                  setOpenFolderOpen(false);
                }}
                edge="end"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Divider />
          </DialogTitle>
          <DialogContent>
            <Box>
              <DialogContentText>
                To directly open a folder, enter the folder location (ex. "/"),
                and click the "Done" button and SFM will take you there.
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                label="Folder Location"
                error={fieldError}
                defaultValue={pathname}
                helperText={
                  fieldError ? "That isn't a valid directory" : undefined
                }
                fullWidth
                onKeyDown={(key) => {
                  if (key.key == "Enter") {
                    var input = (
                      dirRef?.children[1].children[0] as HTMLInputElement
                    ).value;

                    fetch("/api/file-api/dirExist", {
                      headers: { "dir-exist": input },
                    })
                      .then((res) => res.json())
                      .then((result) => {
                        if (result.data == false) {
                          setFieldError(true);
                        } else {
                          setOpenFolderOpen(false);
                          window.location.pathname = "/client/files/" + input;
                        }
                      });
                  }
                }}
                ref={(ref) => {
                  dirRef = ref;
                }}
                variant="standard"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                var input = (
                  dirRef?.children[1].children[0] as HTMLInputElement
                ).value;

                fetch("/api/file-api/dirExist", {
                  headers: { "dir-exist": input },
                })
                  .then((res) => res.json())
                  .then((result) => {
                    if (result.data == false) {
                      setFieldError(true);
                    } else {
                      setOpenFolderOpen(false);
                      window.location.pathname = "/client/files/" + input;
                    }
                  });
              }}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={diaOpen}>
          <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Alert severity="error">
                <AlertTitle>Server might not be online. </AlertTitle>
                SFM requires SFMApi to launch. Get it at{" "}
                <Link href="https://github.com">DeveloLongScript/SFMApi</Link>.
              </Alert>

              <br />
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <strong>Troubleshooting</strong>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <p>
                        There are some problems that happen when the server{" "}
                        <strong>is</strong> online and is working. One cause is
                        that the port that your using is not the right port.
                        Your server might be using a different port. If you
                        think it is, you will need to rebuild your client with
                        the correct port.
                        <br />
                        <br />
                        Another cause is that your pointing to the wrong
                        address. If you think this is the case, you will also
                        need to rebuild the client.
                      </p>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh page
            </Button>
          </DialogActions>
        </Dialog>
        <Drawer
          open={open}
          onClose={closeSettings}
          anchor={"right"}
          PaperProps={{
            elevation: 0,
            sx: {
              width: { xs: 310, sm: 360 },
              borderRadius: "10px 0px 0px 10px",
            },
          }}
          style={{ zIndex: 999999999 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="body1" fontWeight="500">
              Settings
            </Typography>
            <IconButton onClick={closeSettings} edge="end">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ pl: 2, pr: 2 }}>
            <Heading gutterBottom>color mode</Heading>
            <ToggleButtonGroup fullWidth color="primary">
              <IconToggleButton value="dark">
                <DarkModeOutlinedIcon />
                Dark
              </IconToggleButton>
              <IconToggleButton value="light">
                <LightModeIcon />
                Light
              </IconToggleButton>
            </ToggleButtonGroup>
            <Heading gutterBottom>port</Heading>
            <TextField id="port-input" label="Port" variant="outlined" />
          </Box>
        </Drawer>
      </div>
      <AppBar className="appBar" color="inherit" style={{ zIndex: "30" }}>
        <LinearProgress id="progress" />
        <Toolbar>
          <Stack direction="row" spacing="10px">
            <IconButton color="primary" sx={{ px: "8px" }} href="/">
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
                        <Paper style={{ width: 300, zIndex: 11 }}>
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
                            <Divider />
                            <Heading sx={{ paddingLeft: 1.5 }}>Program</Heading>
                            <MenuItem
                              onClick={() => {
                                setAboutOpen(true);
                                popupState.close();
                              }}
                            >
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

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search... (hit enter)"
                id="input"
                onKeyDown={(k) => {
                  if (k.key == "Enter") {
                    var input = (
                      document.getElementById("input") as HTMLInputElement
                    ).value;
                    setSearchKeyword(input);
                    openSearchDialog();
                  }
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>
        </Toolbar>
      </AppBar>
      <FadeIn>
        <br />
        <br />
        <br />
        <div className="insetContents">
          <FadeIn>
            <TitleComponent
              title={<div>{decodeURI(pathname)}</div>}
              caption={decodeURI(pathname) === "/" ? "root" : "directory"}
            />
            <br />
            <Grid container spacing={0.5}>
              {decodeURI(pathname) !== "/" && (
                <Grid item>
                  <IconButton
                    href={
                      "/client/files/" + resolve(decodeURI(pathname), "../")
                    }
                    color="primary"
                  >
                    <ArrowBackOutlinedIcon fontSize="small" />
                  </IconButton>
                  {"    "}
                </Grid>
              )}

              <Grid item>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setListView(!isListView);
                  }}
                >
                  <ViewListIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="primary"
                  href={"/client/terminal?dir=" + pathname}
                  disabled={!authenticated}
                >
                  <TerminalIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>

            <br />

            <Divider />
            {isListView ? <ListView /> : <ListComp />}
          </FadeIn>
        </div>
      </FadeIn>
    </div>
  );
}

var value: string = "";

function SearchList(props: { pattern: string }) {
  const { isLoading, data } = useFetch("/api/file-api/searchFS", {
    headers: { pat: props.pattern },
  });

  if (isLoading) {
    return (
      <>
        <CircularProgress sx={{ pt: 5, ml: "auto", mr: "auto" }} />
      </>
    );
  }
  return (
    <>
      <List>
        {((data as any).data as string[]).map((elm) => (
          <FadeIn>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <FileOpenIcon />
                </ListItemIcon>
                <ListItemText
                  primary={elm}
                  secondary={
                    <SizeChecking file={{ name: elm, type: "file" }} />
                  }
                />
              </ListItemButton>
            </ListItem>
          </FadeIn>
        ))}
      </List>
    </>
  );
}

function ListAllFiles(props: { dir: string }) {
  const [newDataComingIn, setDataIn] = useState(true);
  const rand = Math.floor(Math.random() * 3);
  var { isLoading, data } = useFetch(`/api/file-api/getDirFiles`, {
    headers: {
      "from-dir": decodeURI(pathname),
    },
    depends: [newDataComingIn],
  });

  const reloadFunction = React.useCallback(() => {
    setDataIn(false);
    setTimeout(() => {
      setDataIn(true);
    }, 50);
  }, []);
  if (isLoading === true || data === undefined) {
    return (
      <>
        {[...Array(rand)].map((e, i) => (
          <Box>
            <Skeleton variant="rounded" height={48} animation="wave" />
            <br />
            <Skeleton variant="rounded" height={48} animation="wave" />
            <br />
            <Skeleton variant="rounded" height={48} animation="wave" />
            {rand == 2 && <br />}
          </Box>
        ))}
        {rand == 0 && (
          <Box>
            <Skeleton variant="rounded" height={48} animation="wave" />
            <br />
            <Skeleton variant="rounded" height={48} animation="wave" />
            <br />
            <Skeleton variant="rounded" height={48} animation="wave" />
          </Box>
        )}
      </>
    );
  }
  return (
    <div>
      {newDataComingIn == true && (
        <div>
          <RemoveLoad />
          <Box>
            <Box sx={{ mb: 1 }}>
              <Grid container spacing={{ xs: 6, md: 3 }}>
                {((data as any).data as Array<{ type: string; name: string }>)
                  .length === 0 && (
                  <Grid
                    item
                    key={
                      "key-" +
                      Math.random() *
                        Math.random() *
                        Math.random() *
                        Math.random()
                    }
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        display: "flex",
                        "& svg": {
                          transition: "0.2s",
                        },
                        "&:hover": {
                          "& svg": {
                            transform: "translateY(-2px)",
                          },
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          borderRadius: "4px",
                          width: 40,
                          height: 40,
                        }}
                      >
                        <Crop54Icon />
                      </Avatar>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="body2" fontWeight="bold">
                          Hmmm, it looks like nothing is here.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Maybe look somewhere else.
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                )}

                {sortDirectory(
                  (data as any).data as Array<{ type: string; name: string }>
                ).map((file) => (
                  <>
                    {file.type === "folder" && (
                      <Grid item key={file.name} xs={12} sm={6} md={4} lg={3}>
                        <Paper
                          href={
                            "/client/files/" +
                            join(decodeURI(pathname), file.name)
                          }
                          component={Link}
                          variant="outlined"
                          sx={{
                            p: 2,
                            display: "flex",
                            "& svg": {
                              transition: "0.2s",
                            },
                            "&:hover": {
                              "& svg": {
                                transform: "translateY(-2px)",
                              },
                            },
                          }}
                        >
                          <Avatar
                            sx={{
                              borderRadius: "4px",
                              width: 40,
                              height: 40,
                            }}
                          >
                            <FolderIcon />
                          </Avatar>
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="body2" fontWeight="bold">
                              {file.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <FileContents
                                directory={join(decodeURI(pathname), file.name)}
                              />
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
            </Box>
          </Box>

          <br />

          <div>
            {sortDirectory(
              (data as any).data as Array<{ type: string; name: string }>
            ).map((file) => (
              <>
                {file.type !== "folder" && (
                  <FileLink file={file} refreshFunction={reloadFunction} />
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function FileContents(props: { directory: string }): JSX.Element {
  const { isLoading, data, error } = useFetch(`/api/file-api/getDirFiles`, {
    headers: {
      "from-dir": props.directory,
    },
  });

  if (isLoading === true || data === undefined) {
    return <></>;
  }
  if (error?.status == 400) {
    toast.error("Error get directory files.....");
    return <></>;
  }

  return (
    <div>
      {(data as any).data !== undefined && (
        <div>
          {((data as any).data as Array<{ type: string; name: string }>).length}{" "}
          item
          {((data as any).data as Array<{ type: string; name: string }>)
            .length != 1 && <>s</>}
        </div>
      )}
    </div>
  );
}

function sortDirectory(
  directory: Array<{ type: string; name: string }>
): Array<{ type: string; name: string }> {
  var directories: Array<{ type: string; name: string }> = [];
  var files: Array<{ type: string; name: string }> = [];

  directory.forEach((val) => {
    if (val.type === "folder") {
      directories.push(val);
    } else {
      files.push(val);
    }
  });

  // directories go first before files
  return directories.concat(files);
}

function downloadFile(file: { type: string; name: string }) {
  toast.promise(
    new Promise<unknown>((resolve, reject) => {
      var request = fetch(`/api/file-api/downloadFile`, {
        method: "GET",
        headers: {
          file: join(decodeURI(pathname), file.name),
        },
      });

      request
        .then((res) => {
          var maxBase64 = 1048576;

          res.text().then((str) => {
            var link = document.createElement("a");

            var text = str;
            var windowUrl = window.URL || window.webkitURL;

            if (
              str.length > maxBase64 &&
              typeof windowUrl.createObjectURL === "function"
            ) {
              var blob = new Blob([text], { type: res.type });
              var url = windowUrl.createObjectURL(blob);

              link.setAttribute("href", url);
              link.setAttribute("download", file.name);

              link.click();
              URL.revokeObjectURL(url);
            } else {
              link.setAttribute(
                "href",
                "data:" +
                  res.type +
                  ";base64," +
                  Buffer.from(str, "utf8").toString("base64")
              );
              link.setAttribute("download", file.name);
              link.click();
            }

            resolve(undefined);
          });
        })
        .catch(() => {
          reject(undefined);
        });
    }),
    {
      loading: "Getting files ready for download...",
      error: "There was a problem saving",
      success: "Files downloaded!",
    }
  );
}

function FileLink(props: {
  file: { type: string; name: string };
  refreshFunction: () => void;
}): JSX.Element {
  var [isBinary, setBinary] = useState(true);
  var [renameOpen, setRandomOpen] = useState(false);
  fetch("/api/file-api/isBinary", {
    headers: { file: join(pathname, props.file.name) },
  })
    .then((res) => res.json())
    .then((result) => {
      setBinary(result.result as boolean);
    });

  const RenameComponent = (props: {
    open: boolean;
    setOpen: (b: boolean) => void;
    file: { type: string; name: string };
    refreshFunction: () => void;
  }) => {
    return (
      <Dialog
        open={props.open}
        onClose={() => {
          props.setOpen(false);
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
            }}
          >
            <Typography variant="body1" fontWeight="500">
              Rename "{props.file.name}"
            </Typography>
            <IconButton
              onClick={() => {
                props.setOpen(false);
              }}
              edge="end"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="renameText"
            defaultValue={props.file.name}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              var element: HTMLInputElement =
                document.getElementById("renameText");
              var value = element?.value;

              toast.promise(
                new Promise((good, bad) => {
                  fetch("/api/file-api/renameFile", {
                    headers: {
                      file: join(pathname, props.file.name),
                      newname: value,
                    },
                  })
                    .then((r) => {
                      props.refreshFunction();
                      good("");
                    })
                    .catch(() => {
                      bad();
                    });
                }),
                {
                  success: "Done renaming file.",
                  loading: "Renaming file...",
                  error: "Error renaming file.",
                }
              );
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <RenameComponent
        open={renameOpen}
        setOpen={setRandomOpen}
        file={props.file}
        refreshFunction={props.refreshFunction}
      />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{props.file.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemButton
                onClick={() => {
                  downloadFile(props.file);
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ borderRadius: "4px", width: 40, height: 40 }}>
                    <DownloadIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Download"
                  secondary={<SizeChecking file={props.file} />}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                href={"/client/editor" + join(pathname, props.file.name)}
                disabled={isBinary}
              >
                <ListItemAvatar>
                  <Avatar sx={{ borderRadius: "4px", width: 40, height: 40 }}>
                    <EditIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Edit file"
                  secondary={
                    isBinary
                      ? "SFM cannot edit this file type."
                      : "Enter the inbuilt editor"
                  }
                />
              </ListItemButton>
            </ListItem>

            <PopupState variant="popper" popupId="demo-popup-popper">
              {(popupState) => (
                <div>
                  <ListItem>
                    <Popper
                      {...bindPopper(popupState)}
                      transition
                      placement="bottom-start"
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper elevation={5} style={{ width: 300 }}>
                            <MenuList>
                              <Heading sx={{ paddingLeft: 1.5 }}>
                                Write Actions
                              </Heading>
                              <MenuItem
                                onClick={() => {
                                  toast.promise(
                                    new Promise((resolve, error) => {
                                      fetch("/api/file-api/deleteFile", {
                                        headers: {
                                          file: join(pathname, props.file.name),
                                        },
                                      })
                                        .then(() => {
                                          resolve("");
                                          props.refreshFunction();
                                        })
                                        .catch(() => {
                                          error("");
                                        });
                                    }),
                                    {
                                      success: "Successfully deleted file.",
                                      error:
                                        "There was an error deleting the file.",
                                      loading: "Deleting....",
                                    }
                                  );
                                }}
                              >
                                <ListItemIcon>
                                  <DeleteIcon />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                              </MenuItem>
                              <MenuItem>
                                <ListItemIcon>
                                  <FolderIcon />
                                </ListItemIcon>
                                <ListItemText>Move</ListItemText>
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setRandomOpen(true);
                                }}
                              >
                                <ListItemIcon>
                                  <EditIcon />
                                </ListItemIcon>
                                <ListItemText>Rename</ListItemText>
                              </MenuItem>
                            </MenuList>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                    <ListItemButton {...bindToggle(popupState)}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ borderRadius: "4px", width: 40, height: 40 }}
                        >
                          <MoreVertIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="More Actions"
                        secondary="Delete, Move, Rena...."
                      />
                    </ListItemButton>
                  </ListItem>
                </div>
              )}
            </PopupState>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

function ListView(): JSX.Element {
  const { isLoading, data } = useFetch(`/api/file-api/getDirFiles`, {
    headers: {
      "from-dir": decodeURI(pathname),
    },
  });
  var SwappedData: any;

  if (isLoading == true || data === undefined) {
    return <></>;
  } else {
    var sentData: Array<{ type: string; name: string }> = (data as any).data;
    var newData: Array<{
      type: string;
      id: number;
      name: string | JSX.Element;
    }> = [];

    sentData.reverse();

    sentData.forEach((element, i) => {
      if (element.type === "folder") {
        newData.push({
          type: element.type,
          id: i,
          name: (
            <Link
              href={"/client/files/" + join(decodeURI(pathname), element.name)}
            >
              {element.name}
            </Link>
          ),
        });
      } else {
        newData.push({ type: element.type, id: i, name: element.name });
      }
    });

    var sent = { code: (data as any).code as number, data: newData };
    SwappedData = sent;
  }

  return (
    <Box>
      <br />
      <br />
      <FadeIn>
        <DataGrid
          rows={(SwappedData as any).data as any}
          columns={[
            { field: "id", headerName: "ID", width: 90 },
            {
              field: "name",
              headerName: "Name",
              width: 450,
              renderCell: (params) => <>{params.value}</>,
            },
            {
              field: "type",
              headerName: "Type",
              width: 150,
              renderCell: (params) => <>{params.value}</>,
            },
          ]}
        />
      </FadeIn>
    </Box>
  );
}

function SizeChecking(props: {
  file: { type: string; name: string };
}): JSX.Element {
  const { isLoading, data } = useFetch(`/api/file-api/getMetadata`, {
    headers: { "stat-file": join(decodeURI(pathname), props.file.name) },
  });

  if (isLoading === true || data === undefined) {
    return <></>;
  }

  return <div>{formatBytes((data as any).data.size)}</div>;
}

function RemoveLoad(): JSX.Element {
  if (document.getElementById("progress") != null) {
    document.getElementById("progress")?.remove();
  }
  return <></>;
}
