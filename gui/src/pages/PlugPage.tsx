import { TitleComponent } from "../components/TitleComp";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExtensionIcon from "@mui/icons-material/Extension";
import Stack from "@mui/material/Stack";
import address from "./Index"
import Avatar from "@mui/material/Avatar";
import { join, resolve } from "path-browserify";
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
import List from "@mui/material/List";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import DialogTitle from "@mui/material/DialogTitle";

const IconToggleButton = styled(ToggleButton)({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      marginRight: "8px",
    },
  });
const Heading = styled(Typography)(({ theme }) => ({
    margin: "20px 0 10px",
    color: theme.palette.grey[600],
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(11),
    textTransform: "uppercase",
    letterSpacing: ".08rem",
  }));

export default function PluginPage() {
  const [openFolderOpen, setOpenFolderOpen] = useState(false);
  const [open, setOpen] = useState(false);
  
  const closeSettings = () => {
    setOpen(false);
  };

  return (
    <>
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

              <AutoCompleteDirectory onEmpty={() => {}} onUnempty={() => {}}/>
              <br />
              <br />
            </Box>
          </DialogContent>
        </Dialog>
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
                                <InfoOutlinedIcon />
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
    </>
  );
}
var value: string = "";
function AutoCompleteDirectory(props: {
    onEmpty: () => void;
    onUnempty: () => void;
  }): JSX.Element {
    const [card, setCard] = useState();
  
    useEffect(() => {
      fetch(`http://${address}/v1/query-api/dir-struct`)
        .then((res) => res.json())
        .then((data) => setCard(data));
    });
  
    if (card === undefined) {
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
        options={(card as any).data as string[]}
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