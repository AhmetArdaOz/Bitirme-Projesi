import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { movieData } from "../constants/data"; // Importing movie data
import "../styling/MainPage.css";

export default function MainPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerItemClick = (route) => {
    navigate(route);
    setDrawerOpen(false);
  };

  return (
      <div className="App">
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Project_Bitirme
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer className="Drawer" anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List className="Drawer-List">
            <ListItem className="Drawer-ListItem" button onClick={() => handleDrawerItemClick("/")}>
              <ListItemText className="Drawer-ListItemText" primary="Home" />
            </ListItem>
            <ListItem className="Drawer-ListItem" button onClick={() => handleDrawerItemClick("movies")}>
              <ListItemText className="Drawer-ListItemText" primary="Movies" />
            </ListItem>
            <ListItem className="Drawer-ListItem" button onClick={() => handleDrawerItemClick("series")}>
              <ListItemText className="Drawer-ListItemText" primary="Series" />
            </ListItem>
            <ListItem className="Drawer-ListItem" button onClick={() => handleDrawerItemClick("oldbutgold")}>
              <ListItemText className="Drawer-ListItemText" primary="Old but Gold" />
            </ListItem>
          </List>
        </Drawer>
        <Container className="MainContent">
          <div className="MovieList">
            {movieData.map((movie) => (
                <Card key={movie.id} className="MovieCard">
                  <CardActionArea>
                    <CardMedia
                        component="img"
                        height="500"
                        image={movie.imageUrl}
                        alt={movie.title}
                        className="MovieCard-Image"
                    />
                    <CardContent className="MovieCard-Content">
                      <Typography gutterBottom variant="h5" component="div" className="MovieCard-Title">
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="MovieCard-Genre">
                        Genre: {movie.genre}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
            ))}
          </div>
        </Container>
      </div>
  );
}
