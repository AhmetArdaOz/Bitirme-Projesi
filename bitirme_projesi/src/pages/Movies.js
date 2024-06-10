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
  AccordionSummary,
  AccordionDetails,
  Skeleton,
  Fade,
  Zoom,
  Slide,
  Rating,
  TextField,
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
    year: 0,
    rating: 0,
    name: "",
  });
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const moviesPerPage = 6;

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genresResponse = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setGenres(genresResponse.data.genres);

        let movies = [];
        const totalPages = Math.ceil(MOVIE_COUNT / 50);
        for (let page = 1; page <= totalPages; page++) {
          const moviesResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/popular`,
            {
              params: {
                api_key: API_KEY,
                page: page,
              },
            }
          );
          const data = moviesResponse.data;
          movies = [...movies, ...data.results];
        }
        setMovieData(movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenresAndMovies();
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const changeFilter = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
    setPage(1);
  };

  const clearFilters = () => {
    setFilter({
      genre: "",
      year: 0,
      rating: 0,
      name: "",
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
      (filter.year === 0 ||
        new Date(movie.release_date).getFullYear() === filter.year) &&
      (filter.rating === 0 ||
        Math.floor(movie.vote_average) === filter.rating) &&
      (filter.name === "" ||
        movie.title.toLowerCase().includes(filter.name.toLowerCase()))
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
          <Slide in={true} direction="down" timeout={1000}>
            <Box className="sidebar">
              <>
                <Typography variant="h6" className="title">
                  Find Movies You Like:
                </Typography>
                <TextField
                  variant="outlined"
                  value={filter.name}
                  onChange={(event) => changeFilter("name", event.target.value)}
                  className="name-filter"
                  placeholder="Enter movie name"
                  InputProps={{
                    style: {
                      backgroundColor: "#333",
                      color: "#fff",
                    },
                  }}
                  sx={{
                    marginTop: "10px",
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#e50914",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#e50914",
                      },
                    "& .MuiInputLabel-root": {
                      color: "#e50914",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#e50914",
                    },
                  }}
                />
                <List sx={{ marginTop: "10px" }}>
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
                <Typography
                  variant="h6"
                  className="title"
                  sx={{ marginTop: "10px" }}
                >
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
                <Typography
                  variant="h6"
                  className="title"
                  sx={{ marginTop: "20px" }}
                >
                  Filter by Rating:
                </Typography>
                <Rating
                  name="rating-filter"
                  value={filter.rating}
                  onChange={(event, newValue) => {
                    changeFilter("rating", newValue);
                  }}
                  max={10}
                  precision={1}
                  sx={{ color: "#e50914" }}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                  }}
                >
                  <IconButton onClick={clearFilters} color="inherit">
                    <ClearIcon />
                    <Typography variant="body1" className="clear-all-text">
                      Clear All
                    </Typography>
                  </IconButton>
                </Box>
              </>
            </Box>
          </Slide>
          <Box className="movieContainer">
            {loading
              ? Array.from(new Array(moviesPerPage)).map((_, index) => (
                  <Box key={index} className="movieCardWrapper">
                    <Skeleton variant="rectangular" height={400} width={280} />
                    <Skeleton variant="text" height={20} width="90%" />
                    <Skeleton variant="text" height={20} width="85%" />
                  </Box>
                ))
              : currentMovies.map((movie, index) => (
                  <Fade in={true} timeout={index * 500} key={index}>
                    <Box className="movieCardWrapper">
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
                            sx={{
                              color: "#e50914",
                            }}
                            name="simple-controlled"
                            value={movie.vote_average}
                            max={10}
                            precision={0.5}
                            size="small"
                            readOnly
                          />
                        </Box>
                      </Card>
                    </Box>
                  </Fade>
                ))}
          </Box>
        </Box>
        <Box className="pagination-container">
          {loading ? (
            <Skeleton variant="rectangular" height={40} width={200} />
          ) : (
            <>
              <Pagination
                count={Math.ceil(filteredMovies.length / moviesPerPage)}
                page={page}
                onChange={handlePageChange}
                color="standard"
              />
            </>
          )}
        </Box>

        <div className="aipage">
          <Zoom in={true} timeout={1500}>
            <Accordion sx={{ backgroundColor: "#1c1c1c", color: "white" }}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon sx={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ color: "white" }}
              >
                <Typography>Talk to ChatBot</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AiPage />
              </AccordionDetails>
            </Accordion>
          </Zoom>
        </div>
      </Container>
    </>
  );
}
