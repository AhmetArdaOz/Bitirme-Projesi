import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertSnackbar from "./SnackBar";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {
        "This website made by © Ahmet Arda Öz, Alp Efe Sezer, Kazım Utku Çitoğlu"
      }{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#e50914",
    },
    background: {
      default: "rgba(0, 0, 0, 0.89)",
    },
  },
});

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setOpenAlert(true);
      setMessage("Please enter your name, lastname, email and password.");
      setSeverity("error");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/register",
        {
          name: firstName,
          surname: lastName,
          email: email,
          password: password,
        }
      );

      const token = response.data.token;

      localStorage.setItem("token", token);
      console.log("Registered successfully!");
      navigate("/signin");
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      if (error.response.data.message === "Same Email") {
        setOpenAlert(true);
        setMessage(
          "Email already exists. Please use a different email address."
        );
        setSeverity("error");
      } else {
        setOpenAlert(true);
        setMessage("Registration failed: Unknown Error");
        setSeverity("error");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Zoom in={true} timeout={1000}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            height: "%100",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grow in={true} timeout={1500}>
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
            </Grow>
            <Fade in={true} timeout={2000}>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </Fade>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Fade in={true} timeout={2500}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Fade>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Fade in={true} timeout={3000}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Fade>
                </Grid>
                <Grid item xs={12}>
                  <Fade in={true} timeout={3500}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Fade>
                </Grid>
                <Grid item xs={12}>
                  <Fade in={true} timeout={4000}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Fade>
                </Grid>
              </Grid>
              <Fade in={true} timeout={4500}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Fade>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
          <AlertSnackbar
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
            message={message}
            severity={severity}
          />
        </Container>
      </Zoom>
    </ThemeProvider>
  );
}
