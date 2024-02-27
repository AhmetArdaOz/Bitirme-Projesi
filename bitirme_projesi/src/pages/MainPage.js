import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../App.css";

export default function MainPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="App">
      <Container sx={{ margin: "auto" }}>
        <AppBar
          position="fixed"
          style={{
            backgroundColor: "#000",
            borderBottom: "3px solid #e50914",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          <Toolbar>
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
            <Button color="inherit">Sign In</Button>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Movies" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Series" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Old but Gold" />
            </ListItem>
          </List>
        </Drawer>
      </Container>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom style={{ color: "#fff" }}>
              Featured Movies
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card style={{ backgroundColor: "#000", color: "#fff" }}>
              <CardMedia
                component="img"
                height="300"
                image="https://via.placeholder.com/300x450"
                alt="Movie Title"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Movie Title
                </Typography>
                <Typography variant="body2">
                  Description of the movie goes here.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
