import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../styling/AppBar.css";
import { Link } from "react-router-dom";

export default function MainBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerItemClick = (route) => {
    navigate(route);
    setDrawerOpen(false);
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    console.log("signed out perfectly");
  };

  return (
    <Container className="Bar">
      <AppBar className="AppBar" position="fixed">
        <Toolbar className="AppBar-Toolbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/home" className="AppBar-Link">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Project_Bitirme
            </Typography>
          </Link>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            aria-label="account"
            onClick={handleMenuClick}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleDrawerItemClick("admin")}>
              Admin
            </MenuItem>
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box>
        <Drawer
          className="Drawer"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <List className="Drawer-List">
            <ListItem
              className="Drawer-ListItem"
              button
              onClick={() => handleDrawerItemClick("home")}
            >
              <ListItemText className="Drawer-ListItemText" primary="Home" />
            </ListItem>
            <ListItem
              className="Drawer-ListItem"
              button
              onClick={() => handleDrawerItemClick("movies")}
            >
              <ListItemText className="Drawer-ListItemText" primary="Movies" />
            </ListItem>
            <ListItem
              className="Drawer-ListItem"
              button
              onClick={() => handleDrawerItemClick("support")}
            >
              <ListItemText className="Drawer-ListItemText" primary="Support" />
            </ListItem>
            <ListItem
              className="Drawer-ListItem"
              button
              onClick={() => handleDrawerItemClick("about")}
            >
              <ListItemText className="Drawer-ListItemText" primary="About" />
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </Container>
  );
}
