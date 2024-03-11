import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
        AppBar,
        Toolbar,
        Typography,
        IconButton,
        Drawer,
        List,
        ListItem,
        ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../styling/AppBar.css"

export default function MainBar(){
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerItemClick = (route) => {
        navigate(route);
        setDrawerOpen(false);
    };
    return(
        <div className="Bar">
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
                    <ListItem className="Drawer-ListItem" button onClick={() => handleDrawerItemClick("home")}>
                        <ListItemText className="Drawer-ListItemText" primary="Home" />
                    </ListItem>
                    <ListItem className="Drawer-ListItem" button onClick={() => handleDrawerItemClick("movies")}>
                        <ListItemText className="Drawer-ListItemText" primary="Movies" />
                    </ListItem>
                    <ListItem className="Drawer-ListItem" button onClick={() => handleDrawerItemClick("series")}>
                        <ListItemText className="Drawer-ListItemText" primary="Series" />
                    </ListItem>
                    <ListItem className="Drawer-ListItem" button onClick={() => handleDrawerItemClick("new&popular")}>
                        <ListItemText className="Drawer-ListItemText" primary="New & Popular" />
                    </ListItem>
                    <ListItem className="Drawer-ListItem" button onClick={() => handleDrawerItemClick("mylist")}>
                        <ListItemText className="Drawer-ListItemText" primary="My List" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}
