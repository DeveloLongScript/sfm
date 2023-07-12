"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { Metadata } from 'next'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Link } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"SFM is licensed under the "}
      <Link color="inherit" href="https://github.com/DeveloLongScript/sfm/blob/main/LICENSE">
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

 
export const metadata: Metadata = {
  title: 'Config Login | SFM',
  description: 'Login to continue.',
}

export default function SignInSide() {
  const [open, setOpen] = React.useState(true);
  var [error, setError] = React.useState(false)

  var message: { show: boolean; message: string } = {
    show: false,
    message: "",
  };
  fetch("/api/user-api/isLogin").then((data) => data.json()).then((response) => {
    if (response.result == true) {
      fetch("/api/user-api/getPerms").then((data) => data.json()).then((response) => {
        if ((response.data as string).includes("A")) {
          window.location.pathname = "/settings/dashboard"
        }
      })
    }
  })


  fetch("/api/setup-api/isSetupYet").then((data) => {
    data.json().then((realdata) => {
      if ((realdata as any).data == false) {
        window.location.pathname = "/settings/setup";
      } else {
        setOpen(false);
      }
    });
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setOpen(true);
    const data = new FormData(event.currentTarget);
    fetch("/api/user-api/loginUser", {
      headers: {
        username: data.get("username") as string,
        password: data.get("password") as string,
      },
    }).then((res) => res.json()).then((response) => {
      console.log("Redirecting....")
      fetch("/api/user-api/getPerms").then((res) => res.json()).then((responsea) => {
        console.log("Redirecting....")
        if (((responsea as any).data as string).includes("A")) {
          console.log("Redirecting....")
          window.location.pathname = "/settings/dashboard"
        } else {
          setError(true);
        }
      })
    });
  };

  return (
    <div>
      <title>Login - SFM Config</title>
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

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Config Sign in
            </Typography><br/>
            {message.show == true && (
              <>
                <br />
                <Alert severity="info">{message.message}</Alert>
              </>
            )}
            {error == true && (
              <>
                <br /><br/>
                <Alert severity="error">Either this account doesn't have admin permissions or the incorrect username/password was inputed.</Alert>
              </>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <br />
              <Typography variant="body2" color="text.secondary" align="center">
                This login is ONLY for the config, you will need admin
                permissions to sign in. (if you need to look at files go to the{" "}
                <Link>file browser</Link>)
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
