import { TitleComponent } from "../components/TitleComp";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExtensionIcon from "@mui/icons-material/Extension";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { join, resolve } from "path-browserify";
import useFetch from "react-fetch-hook";
import { DataGrid } from "@mui/x-data-grid";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
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
} from "@mui/material/";
import { Toaster, toast } from "react-hot-toast";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import FadeIn from "react-fade-in";
import { Buffer } from "buffer";
import TextField from "@mui/material/TextField";
import { Link as RoutLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DialogContentText from "@mui/material/DialogContentText";
import AlertTitle from "@mui/material/AlertTitle";
import Crop54Icon from "@mui/icons-material/Crop54";
import ViewListIcon from "@mui/icons-material/ViewList";
import List from "@mui/material/List";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import DialogTitle from "@mui/material/DialogTitle";

export const address = "localhost:3000";

const Heading = styled(Typography)(({ theme }) => ({
  margin: "20px 0 10px",
  color: theme.palette.grey[600],
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(11),
  textTransform: "uppercase",
  letterSpacing: ".08rem",
}));

const IconToggleButton = styled(ToggleButton)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  "& > *": {
    marginRight: "8px",
  },
});

function Index() {
  const [open, setOpen] = useState(false);
  const [diaOpen, setDiaOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isListView, setListView] = useState(false);
  const [openFolderOpen, setOpenFolderOpen] = useState(false);

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
    const { isLoading, data } = useFetch(
      `http://${address}/api/file-api/dirExist`,
      {
        headers: { "dir-exist": decodeURI(window.location.pathname) },
      }
    );

    if (isLoading === true || data === undefined) {
      return <></>;
    }
    return (
      <FadeIn
        className={(Math.random() * Math.random()).toString() + "-fadein"}
      >
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
                <Link to="/" component={RoutLink}>
                  Go back home
                </Link>
              </Typography>
            </div>
          )}
        </div>
      </FadeIn>
    );
  };
  return (
    <div>
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
                and click the suggested folder you would like to go to and SFM
                will take you there.
              </DialogContentText>

              <AutoCompleteDirectory
                onEmpty={() => {
                  setDisabled(true);
                }}
                onUnempty={() => {
                  setDisabled(false);
                }}
              />
              <br />
              <br />
            </Box>
          </DialogContent>
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
      <AppBar className="appBar" color="inherit">
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
                        <Paper
                          sx={(theme) => ({
                            mt: 2,
                            border: "1px solid",
                            borderColor: "grey.200",
                            boxShadow: `0px 4px 20px rgba(170, 180, 190, 0.3)`,
                            maxWidth: "100%",
                            width: 270,
                            ...theme.applyDarkStyles({
                              borderColor: "primaryDark.700",
                              boxShadow: `0px 4px 20px rgba(0, 0, 0, 0.5)`,
                            }),
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
                                window.location.pathname = "|plugins/";
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
                                Ctrl+Shift+P
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
      <FadeIn>
        <br />
        <br />
        <br />
        <div className="insetContents">
          <FadeIn>
            <TitleComponent
              title={<div>{decodeURI(window.location.pathname)}</div>}
              caption={
                decodeURI(window.location.pathname) === "/"
                  ? "root"
                  : "directory"
              }
            />
            <br />
            <Grid container spacing={0.5}>
              {decodeURI(window.location.pathname) !== "/" && (
                <Grid item>
                  <IconButton
                    href={resolve(decodeURI(window.location.pathname), "../")}
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
function AutoCompleteDirectory(props: {
  onEmpty: () => void;
  onUnempty: () => void;
}): JSX.Element {
  const { isLoading, data } = useFetch(
    `http://${address}/api/file-api/getDirStruct`
  );

  if (isLoading === true || data === undefined) {
    return (
      <TextField
        autoFocus
        margin="dense"
        label="Folder Location"
        fullWidth
        onChange={(event) => {
          value = event.target.value;
        }}
        variant="standard"
      />
    );
  }
  return (
    <Autocomplete
      options={(data as any).data as string[]}
      onInputChange={(ev, val) => {
        var nonull = "";

        if (val != null && val != "") {
          nonull = val;

          props.onUnempty();
        } else {
          props.onEmpty();
        }

        value = nonull;
      }}
      renderInput={(params) => (
        <TextField
          autoFocus
          margin="dense"
          value={value}
          label="Folder Location"
          variant="standard"
          {...params}
        />
      )}
    ></Autocomplete>
  );
}

function ListAllFiles(props: { dir: string }) {
  const { isLoading, data } = useFetch(
    `http://${address}/api/file-api/getDirFiles`, {
      headers: {
        "from-dir": decodeURI(window.location.pathname)
      }
    }
  );
  if (isLoading === true || data === undefined) {
    return <></>;
  }
  return (
    <div>
      <RemoveLoad />
      <Box>
        <Box sx={{ mb: 1 }}>
          <Grid container spacing={{ xs: 6, md: 3 }}>
            {((data as any).data as Array<{ type: string; name: string }>)
              .length === 0 && (
              <Grid item key="nothing-here" xs={12} sm={6} md={4} lg={3}>
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
                      href={join(
                        decodeURI(window.location.pathname),
                        file.name
                      )}
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
                            directory={join(
                              decodeURI(window.location.pathname),
                              file.name
                            )}
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
          <>{file.type !== "folder" && <FileLink file={file} />}</>
        ))}
      </div>
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
  const { isLoading, data } = useFetch(
    `http://${address}/api/file-api/getDirFiles`,
    {
      headers: {
        "from-dir": props.directory,
      },
    }
  );

  if (isLoading === true || data === undefined) {
    return <></>;
  }

  return (
    <div>
      {(data as any).data !== undefined && (
        <div>
          {((data as any).data as Array<{ type: string; name: string }>).length}{" "}
          items
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
      var request = fetch(`http://${address}/api/file-api/downloadFile`, {
        method: "GET",
        headers: {
          file: join(decodeURI(window.location.pathname), file.name),
        },
      });

      request
        .then((res) => {
          var maxBase64 = 1048576;

          res.text().then((str) => {
            var link = document.createElement("a");
            var windowUrl = window.URL || window.webkitURL;
            var text = str;

            if (
              str.length > maxBase64 &&
              typeof windowUrl.createObjectURL === "function"
            ) {
              var blob = new Blob([text], { type: res.type });
              var url = windowUrl.createObjectURL(blob);

              link.setAttribute("href", url);
              link.setAttribute("download", file.name);

              link.click();
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
}): JSX.Element {
  return (
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
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function ListView(): JSX.Element {
  const { isLoading, data } = useFetch(
    `http://${address}/api/file-api/getDirFiles`,
    {
      headers: {
        "from-dir": decodeURI(window.location.pathname),
      },
    }
  );
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
              href={join(decodeURI(window.location.pathname), element.name)}
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
    SwappedData = sent
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
  const { isLoading, data } = useFetch(`http://${address}/api/file-api/getMetadata`, {headers: {"stat-file": join(decodeURI(window.location.pathname), props.file.name)}});

  if (isLoading === true || data === undefined)  {
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

export default Index;
