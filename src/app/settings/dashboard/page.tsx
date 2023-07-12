"use client";

import {
  Paper,
  Box,
  Typography,
  Button,
  Grid,
  styled,
  CircularProgress,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  ListItemAvatar,
} from "@mui/material";
import { useCallback, useEffect, useState, forwardRef } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Collapse from "@mui/material/Collapse";
import ExtensionIcon from "@mui/icons-material/Extension";
import FolderIcon from "@mui/icons-material/Folder";
import Badge from "@mui/material/Badge";
import { green } from "@mui/material/colors";

import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Snackbar from "@mui/material/Snackbar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import "@fontsource/roboto/300.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Backdrop from "@mui/material/Backdrop";
import useFetch from "react-fetch-hook";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function GetStatConfig() {
  const { isLoading, data, error } = useFetch("/api/stat-api/readStatConf");

  if (error) {
    setTimeout(() => {
      window.location.pathname = "/"
    }, 100);
    return (
      <div>
        <StaticBackdrop />
        <ErrorSnackbar />
      </div>
    );
  }
  if (isLoading === true) {
    return (
      <div style={{ textAlign: "center", verticalAlign: "middle" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={(data as any).apiUsage}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />

        <Legend />
        <Line
          type="monotone"
          dataKey="requests"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function ErrorSnackbar() {
  const [open, setOpen] = useState(true);
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Alert
        onClose={() => {
          setOpen(false);
        }}
        severity="error"
        sx={{ width: "100%" }}
      >
        Either not logged in (with perms), or not setup yet. Redirecting....
      </Alert>
    </Snackbar>
  );
}

export default function Home() {
  const [open, setOpen] = useState(true);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [state, setState] = useState(false);
  return (
    <main>
      <div>
        <title>Dashboard - SFM Config</title>

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => {
                  setState(true);
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Dashboard
              </Typography>
              <IconButton
                onClick={() => {
                  fetch("/api/user-api/logoutUser")
                    .then((res) => res.json())
                    .then(() => {
                      window.location.pathname = "/";
                    });
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
        <div className="actionDashboard">
          <br />
          <Container>
            <Box>
              <div>
                <Paper>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h5">Open file browser</Typography>
                    <Typography>
                      Open up the file browser to see whats inside.
                    </Typography>
                    <Button>Open</Button>
                  </Box>
                </Paper>
              </div>
            </Box>
            <Grid
              container
              rowSpacing={1}
              sx={{ pt: 1 }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <GetStatConfig />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Typography variant="h6">Configure icon packs</Typography>
                  <Typography variant="body1">Icon packs makes files look better.</Typography><br/><br/><br/><br/>
                  <Button>Okay</Button>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Typography>hi</Typography>
                  <br />
                  <Typography>hi</Typography>
                  <br />
                  <Typography>hi</Typography>
                  <br />
                  <Typography>hi</Typography>
                  <br />
                  <Typography>hi</Typography>
                  <br />
                  <Typography>hi</Typography>
                  <br />
                  <Typography>hi</Typography>
                  <br />
                  <Typography>hi</Typography>
                  <br />
                  <Typography>hi</Typography>
                  <br />
                  <Typography>hi</Typography>
                  <br />
                  <Typography>hi</Typography>
                  <br />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <Drawer
        open={state}
        anchor="left"
        onClose={() => {
          setState(false);
        }}
      >
        <Box sx={{ width: 250 }}>
          <Typography variant="h5" sx={{ pl: 2, pt: 2 }}>
            <Avatar sx={{ bgcolor: green[500] }}>
              <FolderIcon />
            </Avatar>
            <Typography sx={{ pt: 1 }} variant="h5">
              SFM Config
            </Typography>
          </Typography>
          <List>
            <Divider />
            <br />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ width: 37, height: 37 }}>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItemButton onClick={handleClick}>
              <ListItemAvatar>
                <Avatar sx={{ width: 37, height: 37 }}>
                  <SettingsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Configure" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SettingsIcon />
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <SmallAvatar>
                          <SupervisedUserCircleIcon />
                        </SmallAvatar>
                      }
                    ></Badge>
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </List>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SettingsIcon />
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <SmallAvatar>
                          <CloudCircleIcon />
                        </SmallAvatar>
                      }
                    ></Badge>
                  </ListItemIcon>
                  <ListItemText primary="Drives" />
                </ListItemButton>
              </List>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SettingsIcon />
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <SmallAvatar>
                          <ExtensionIcon
                            sx={{ width: "11px", height: "11px" }}
                          />
                        </SmallAvatar>
                      }
                    ></Badge>
                  </ListItemIcon>
                  <ListItemText primary="Plugins" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </main>
  );
}
function StaticBackdrop() {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
