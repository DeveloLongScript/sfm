"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TuneIcon from "@mui/icons-material/Tune";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DownloadingIcon from "@mui/icons-material/Downloading";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FolderIcon from "@mui/icons-material/Folder";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Link } from "@mui/material";
import getFilesystemPort from "@/app/getFSPort";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"SFM is licensed under the "}
      <Link color="inherit" href="https://mui.com/">
        MIT License
      </Link>
      <br />
      {"Pictures are from "}
      <Link color="inherit" href="https://unsplash.com/">
        Unsplash
      </Link>
    </Typography>
  );
}

export default function SignInSide() {
  const [open, setOpen] = React.useState(true);
  const [port, setPort] = React.useState(1928378);
  var [error, setError] = React.useState(false);

  var message: { show: boolean; message: string } = {
    show: false,
    message: "",
  };

  fetch("/api/setup-api/isSetupYet").then((data) => {
    data.json().then((realdata) => {
      if ((realdata as any).data == false) {
        window.location.pathname = "/setup";
      } else {
        setOpen(false);
      }
    });
  });
  getFilesystemPort().then((portGiv) => {
    setPort(portGiv)
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setOpen(true);
    const data = new FormData(event.currentTarget);
    fetch("/api/user-api/loginUser", {
      headers: {
        username: data.get("username") as string,
        password: data.get("password") as string,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        fetch("/api/user-api/getPerms")
          .then((res) => res.json())
          .then((response) => {
            if (((response as any).data as string).includes("A")) {
              window.location.pathname = "/dashboard";
            } else {
              setError(true);
            }
          });
      });
  };
  
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 2 }}>
                <DownloadingIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Where next?
              </Typography>
              <br />

              <Alert severity="success">Successfully set up SFM.</Alert>
              <br />
              <Box>
                <Grid container spacing={3} columns={16}>
                  <Grid item xs={8}>
                    <Button
                      variant="outlined"
                      disabled={port === 1928378}
                      style={{ textTransform: "none" }}
                      href={`http://localhost:${port}`}
                    >
                      <Box sx={{ width: 130, height: 130 }}>
                        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                          <FolderIcon />
                        </Avatar>
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          File browser
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="center"
                        >
                          See whats inside.
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      variant="outlined"
                      style={{ textTransform: "none" }}
                      href="/"
                    >
                      <Box sx={{ width: 130, height: 130 }}>
                        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                          <TuneIcon />
                        </Avatar>
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          Configure
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="center"
                        >
                          Login to configure
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </div>
    );
}
