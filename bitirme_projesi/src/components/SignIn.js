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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setOpenAlert(true);
      setMessage("Please enter both email and password.");
      setSeverity("error");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,
      });
      const token = response.data.token;

      localStorage.setItem("token", token);

      console.log("Logged in successfully!");
      navigate("/suggestion");
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      setOpenAlert(true);
      setMessage("Login Failed: Wrong email or password");
      setSeverity("error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "white", borderRadius: "10px", height: "%100" }}
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="signInTitle">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <AlertSnackbar
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          message={message}
          severity={severity}
        />
      </Container>
    </ThemeProvider>
  );
}
