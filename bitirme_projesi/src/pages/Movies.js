import React from "react";
import {
    Box,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Collapse,
    CardContent
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { movieData } from "../constants/data";
import "../styling/Movies.css";
import {Link as RouterLink} from "react-router-dom";
import Rating from "@mui/material/Rating";

export default function Movies() {
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = React.useState("");
    const [genres, setGenres] = React.useState([]);

    React.useEffect(() => {
        const uniqueGenres = [...new Set(movieData.flatMap((movie) => movie.genre.split(",")))];
        setGenres(uniqueGenres);
    }, []);

    const handleClick = () => {
        setOpen(!open);
    };

    const changeFilter = (genre) => {
        setFilter(genre);
        setOpen(false);
    };

    return (
        <Box className="container">
            <Box className="sidebar">
                <Typography variant="h6">Find Movies You Like:</Typography>
                <List>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText>GENRE</ListItemText>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {genres.map((genre, index) => (
                                <ListItemButton key={index} onClick={() => changeFilter(genre)}>
                                    <ListItemText>{genre}</ListItemText>
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Box>
            <Box className="movieContainer">
                {movieData.filter((movie) => filter === "" || movie.genre.includes(filter)).map((movie, index) => (
                    <div key={index} className="movieCardWrapper">
                        <Card className="movieCard">
                            <CardActionArea component={RouterLink} to={`/moviepage/${movie.id}`}>
                                <CardMedia
                                    component="img"
                                    image={movie.imageUrl}
                                    alt={movie.title}
                                    className="MovieCard-Image"
                                />
                                <CardContent className="MovieCard-Content">
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        className="MovieCard-Title"
                                    >
                                        {movie.title}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        component="div"
                                        className="MovieCard-Title"
                                    >
                                        Director: {movie.director}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        className="MovieCard-Genre"
                                    >
                                        Genre: {movie.genre}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Rating
                                name="simple-controlled"
                                value={movie.rating || 0}
                                readOnly
                            />
                        </Card>
                    </div>
                ))}
            </Box>
        </Box>
    );
}
