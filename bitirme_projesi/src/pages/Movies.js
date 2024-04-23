import React from "react";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  CardContent,
  IconButton,
  Pagination,
  Container,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import { movieData } from "../constants/data";
import "../styling/Movies.css";
import { Link as RouterLink } from "react-router-dom";
import Rating from "@mui/material/Rating";

export default function Movies() {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState({
    genre: "",
    rating: 0,
    year: 0,
  });
  const [genres, setGenres] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const moviesPerPage = 6;

  React.useEffect(() => {
    const uniqueGenres = [
      ...new Set(movieData.flatMap((movie) => movie.genre.split(","))),
    ];
    setGenres(uniqueGenres);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const changeFilter = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
    if (key === "rating") {
      setOpen(false);
    }
    setPage(1);
  };

  const clearFilters = () => {
    setFilter({
      genre: "",
      rating: 0,
      year: 0,
    });
    setPage(1);
  };

  const filteredMovies = movieData.filter(
    (movie) =>
      (filter.genre === "" || movie.genre.includes(filter.genre)) &&
      (filter.rating === 0 || movie.rating === filter.rating) &&
      (filter.year === 0 || movie.year === filter.year)
  );

  const indexOfLastMovie = page * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container className="browseMain">
      <Box className="container">
        <Box className="sidebar">
          <Typography variant="h6" className="title">
            Find Movies You Like:
          </Typography>
          <List>
            <ListItemButton onClick={handleClick}>
              <ListItemText>GENRE</ListItemText>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {genres.map((genre, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => changeFilter("genre", genre)}
                  >
                    <ListItemText>{genre}</ListItemText>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
          <Typography variant="h6">Rating:</Typography>
          <Rating
            name="rating-filter"
            value={filter.rating}
            onChange={(event, newValue) => changeFilter("rating", newValue)}
            precision={0.5}
          />
          <Typography variant="h6" className="title">
            Filter by Year:
          </Typography>
          <input
            type="number"
            value={filter.year}
            onChange={(event) =>
              changeFilter("year", parseInt(event.target.value))
            }
            className="year-filter"
          />
          <Box sx={{ display: "flex", flexDirection: "row", marginTop: "5px" }}>
            <IconButton onClick={clearFilters} color="inherit">
              <ClearIcon />
              <Typography variant="body1" className="clear-all-text">
                Clear All
              </Typography>
            </IconButton>
          </Box>
        </Box>
        <Box className="movieContainer">
          {currentMovies.map((movie, index) => (
            <Box key={index} className="movieCardWrapper">
              <Card className="movieCard">
                <CardActionArea
                  component={RouterLink}
                  to={`/moviepage/${movie.id}`}
                >
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="rating"
                >
                  <Rating
                    name="simple-controlled"
                    value={movie.rating || 0}
                    precision={0.5}
                    readOnly
                  />
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="pagination-container">
        <Pagination
          count={Math.ceil(filteredMovies.length / moviesPerPage)}
          page={page}
          onChange={handlePageChange}
          color="standard"
        />
      </Box>
    </Container>
  );
}
