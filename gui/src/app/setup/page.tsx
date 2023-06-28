"use client";

import {
  Paper,
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
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import ExtensionIcon from "@mui/icons-material/Extension";
import FolderIcon from "@mui/icons-material/Folder";
import { DataGrid } from "@mui/x-data-grid";
import Badge from "@mui/material/Badge";
import { green } from "@mui/material/colors";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import { Fragment, useRef } from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ListItem from "@mui/material/ListItem";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LinearProgress from "@mui/material/LinearProgress";
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
import useFetch from "react-fetch-hook";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Backdrop from "@mui/material/Backdrop";

import ExpandMore from "@mui/icons-material/ExpandMore";
import { passFilterLogic } from "@mui/x-data-grid/internals";

var stepProfile: {
  path: string;
  username: string;
  password: string;
} = { path: "", username: "", password: "" };

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const steps = [
  "Welcome!",
  "Set a storage folder",
  "Create an user",
  "Finalize settings",
];

function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [skipped, setSkipped] = useState(new Set<number>());

  fetch("/api/setup-api/isSetup").then((data) => {
    data.json().then((realdata) => {
      if ((realdata as any).data == true) {
        window.location.pathname = "/";
      } else {
        setBackdropOpen(false);
      }
    });
  });

  const handleClose = () => {
    setBackdropOpen(false);
  };
  const handleOpen = () => {
    setBackdropOpen(true);
  };

  const isStepOptional = (step: number) => {
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handlePassVerifyNext = () => {
    setBackdropOpen(true);
    var pass = document.getElementById("passwordTextValue") as HTMLInputElement;

    if (Array.from(pass.value).length > 4) {
      handleNext();
      stepProfile.password = (
        document.getElementById("passwordTextValue") as HTMLInputElement
      ).value;
      stepProfile.username = (
        document.getElementById("usernameTextValue") as HTMLInputElement
      ).value;
    } else {
      setErrortwo(true);
    }
  };

  const handleVerifyNext = () => {
    setBackdropOpen(true);
    fetch("/api/setup-api/folderExist", {
      headers: {
        "dir-exist": (
          document.getElementById(
            "enterFolderLocationTextInput"
          ) as HTMLInputElement
        ).value,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if ((response as any).data === false) {
          setError(true);
        } else {
          stepProfile.path = (
            document.getElementById(
              "enterFolderLocationTextInput"
            ) as HTMLInputElement
          ).value;
          handleNext();
        }
      });
  };

  const handleLastNext = () => {
    setBackdropOpen(true);
    fetch("/api/setup-api/finalizeSetup", {
      headers: { password: stepProfile.password, username: stepProfile.username, path: stepProfile.path },
      method: "POST",
    }).then(() => {
      window.location.replace("/?message=After setup, you need to login with the provided username and password.")
    })
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  var [error, setError] = useState(false);
  var [errortwo, setErrortwo] = useState(false);

  console.log(activeStep);
  return (
    <Box sx={{ width: "100%" }}>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <></>
      ) : (
        <Fragment>
          {activeStep === 0 && <StepOne />}
          {activeStep === 1 && (
            <div>
              <br />
              <Typography>
                SFM works with a root folder, everything out of it cannot be
                accessed. You need to pick a folder. (if you have a unmounted
                drive, your gonna need to mount that manually)
              </Typography>
              <br />
              <TextField
                label="Folder location"
                id="enterFolderLocationTextInput"
                fullWidth
                error={error}
                helperText={
                  error === true ? "That directory doesn't exist" : ""
                }
                
                sx={{ m: 1 }}
              />
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <br />
              <Typography>
                SFM uses users to authenticate people and tell if people should
                be accessing files. You need to pick a username, and password.
              </Typography>
              <br />
              <TextField
                fullWidth
                label="Username"
                id="usernameTextValue"
                
              />
              <br />
              <br />
              <TextField
                fullWidth
                label="Password"
                
                type="password"
                id="passwordTextValue"
                error={errortwo}
                helperText="All passwords need to be atleast 4 letters long."
              />
            </div>
          )}
          {activeStep === 3 && <StepFour />}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep == 0 && (
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            )}
            {activeStep == 1 && (
              <Button onClick={handleVerifyNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            )}
            {activeStep == 2 && (
              <Button onClick={handlePassVerifyNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            )}
            {activeStep == 3 && (
              <Button onClick={handleLastNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            )}
          </Box>
        </Fragment>
      )}
    </Box>
  );
}

function StepOne() {
  return (
    <div>
      <br />
      <Typography>
        Welcome to SFM! SFM is a open-source web-based file manager licensed
        under the MIT License. It has cool features like iconpacks and plugins
        that no other file manager out there has. Its very simple to setup and
        user-friendly overall. To get started, hit the <strong>Next</strong>{" "}
        button.
      </Typography>
    </div>
  );
}
function StepFour() {
  return (
    <div>
      <br />
      <Typography>
        SFM hasn't set your settings quite yet. By hitting 'Finish', all
        settings will be finalized.
      </Typography>
      <br />
      <b>Settings:</b>
      <br />
      <br />
      <DataGrid
        rows={[
          {
            id: " ",
            location: stepProfile.path,
            username: stepProfile.username,
          },
        ]}
        columns={[
          { headerName: "", field: "id", width: 0 },
          { headerName: "Location", field: "location", width: 300 },
          { headerName: "Username", field: "username", width: 300 },
        ]}
      ></DataGrid>
    </div>
  );
}
export default function Home() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [state, setState] = useState(false);
  return (
    <main>
      <div>
        <title>SFM Config - Dashboard</title>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Setup
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <br />
        <Container>
          <Paper sx={{ p: 3 }}>
            <HorizontalLinearStepper />
          </Paper>
        </Container>
      </div>
    </main>
  );
}
