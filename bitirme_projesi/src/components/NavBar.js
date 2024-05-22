import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "../styling/NavBar.css";

export default function NavBar() {
  return (
    <div id="navBar">
      <AppBar id="AppBar">
        <Toolbar id="AppBar-Toolbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MovieHub
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
