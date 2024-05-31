import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "../styling/NavBar.css";
import MovieHubLogo from "../MOVIEHUB.png";

export default function NavBar() {
  return (
    <div id="navBar">
      <AppBar id="AppBar">
        <Toolbar id="AppBar-Toolbar">
          <img
            src={MovieHubLogo}
            alt="MovieHub Logo"
            style={{ height: "80px", width: "80px", marginLeft: "870px" }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
