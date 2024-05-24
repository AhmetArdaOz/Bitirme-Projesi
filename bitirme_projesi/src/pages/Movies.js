import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Accordion,
  Rating,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Link as RouterLink } from "react-router-dom";
import AiPage from "../components/ChatAi";
import "../styling/Movies.css";

const API_KEY = "b920124b119c33ce96596988f22abbcf";
const MOVIE_COUNT = 5000;

export default function Movies() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({
    genre: "",
    rating: 0,
    year: 0,
  });
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState([]);
  const moviesPerPage = 6;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      let movies = [];
      const totalPages = Math.ceil(MOVIE_COUNT / 50);

      try {
        for (let page = 1; page <= totalPages; page++) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular`,
            {
              params: {
                api_key: API_KEY,
                page: page,
              },
            }
          );
          const data = response.data;
          if (data) {
            movies = [...movies, ...data.results];
          }
        }
        setMovieData(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
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

  const getGenreNames = (genre_ids) => {
    return genre_ids
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .join(", ");
  };

  const filteredMovies = movieData.filter(
    (movie) =>
      (filter.genre === "" ||
        movie.genre_ids.includes(parseInt(filter.genre))) &&
      (filter.rating === 0 ||
        Math.round(movie.vote_average / 2) >= filter.rating) &&
      (filter.year === 0 ||
        new Date(movie.release_date).getFullYear() === filter.year)
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
    <>
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
                      onClick={() => changeFilter("genre", genre.id)}
                    >
                      <ListItemText>{genre.name}</ListItemText>
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
            <Box
              sx={{ display: "flex", flexDirection: "row", marginTop: "5px" }}
            >
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
                      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
                        Release Date: {movie.release_date}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="MovieCard-Genre"
                      >
                        Genres: {getGenreNames(movie.genre_ids)}
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
                      value={movie.vote_average / 2 || 0}
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
        <div className="aipage">
          <Accordion sx={{ backgroundColor: "#1c1c1c", color: "white" }}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon sx={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ color: "white" }}
            >
              <Typography>Talk to Famous Movie Stars</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AiPage />
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
    </>
  );
}
