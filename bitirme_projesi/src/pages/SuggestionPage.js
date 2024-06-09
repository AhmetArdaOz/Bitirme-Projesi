import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import "../styling/SuggestionPage.css";
import { Container } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_KEY = "b920124b119c33ce96596988f22abbcf";

function SuggestionPage() {
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [watched, setWatched] = useState(false);
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedSurname = localStorage.getItem("surname");

    if (storedName && storedSurname) {
      setUserName(storedName);
      setUserLastName(storedSurname);
    } else {
      console.log("User data not found in localStorage.");
    }

    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: API_KEY,
            sort_by: "popularity.desc",
            "release_date.lte": "2016-12-31",
            page: 1,
          },
        }
      );

      const movies = response.data.results;
      if (movies.length > 0) {
        const shuffledMovies = shuffleArray(movies);
        const selectedMovies = shuffledMovies.slice(0, 10);
        setMovies(selectedMovies);
      } else {
        console.log("No movies found for the specified criteria.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRateMovie = async () => {
    const updatedMovies = [...movies];
    if (watched) {
      updatedMovies[currentMovieIndex].rating = rating;
    }
    setCurrentMovieIndex((prevIndex) => prevIndex + 1);
    setMovies(updatedMovies);
    setWatched(false);
    setRating(0);

    const votes = updatedMovies.map((movie) => ({
      movieId: movie.id,
      rating: movie.rating || 0,
    }));

    if (!updatedMovies[currentMovieIndex + 1]) {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const votes = updatedMovies.map((movie) => ({
        user_id: userId,
        movie_id: movie.id,
        vote: movie.rating || 0,
      }));
      console.log("User ID:", userId);
      console.log("Votes:", votes);

      console.log("User ID:", userId);
      console.log("Votes:", votes);

      try {
        await axios.post(
          "http://localhost:3000/api/v1/votes",
          { userId, votes },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await axios.put(
          `http://localhost:3000/api/v1/users/isvisited/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/home");
      } catch (error) {
        console.error("Failed to update user status: ", error.message);
      }
    }
  };

  const handleWatchedChange = (event) => {
    setWatched(event.target.checked);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const currentMovie = movies[currentMovieIndex];

  if (!currentMovie) {
    return (
      <div className="finalMessage-container">
        <Container>
          <div className="button-container">
            <Button
              sx={{ backgroundColor: "#e50914", marginTop: "10px" }}
              variant="contained"
              className="Button"
              component={RouterLink}
              to="/home"
            >
              Go Home
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="suggestion-container">
      <Typography variant="h4" className="suggestion-title">
        Welcome {userName} {userLastName}!
      </Typography>
      <Typography variant="body1" className="suggestion-message">
        Can you help us personalize your experience? As you rate ten movies, our
        algorithm will better understand your preferences and offer tailored
        recommendations. Even if you haven't seen some of them, your input is
        valuable.
      </Typography>
      <Button
        sx={{
          backgroundColor: "#e50914",
          "&:hover": { backgroundColor: "#e34149" },
        }}
        variant="contained"
        onClick={handleOpen}
        className="button-container"
      >
        Next
      </Button>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          className="dialog-box"
        >
          <DialogTitle className="dialogTitle">
            {currentMovie.title}
          </DialogTitle>
          <DialogContent
            className={`dialogBody ${watched ? "watched-content" : ""}`}
          >
            <Typography variant="body1">
              Director: {currentMovie.director}
            </Typography>
            <Typography variant="body1">Genre: {currentMovie.genre}</Typography>
            <img
              src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
              alt={currentMovie.title}
              className="movie-image"
            />
            <FormControlLabel
              control={
                <Checkbox checked={watched} onChange={handleWatchedChange} />
              }
              label="I watched this movie"
              className="watched-checkbox"
            />
            {watched && (
              <div className="rating-section">
                <Typography variant="body1" className="rate-text">
                  Rate this movie:
                </Typography>
                <Rating
                  value={rating}
                  sx={{ color: "#e50914" }}
                  precision={0.5}
                  onChange={handleRatingChange}
                  max={10}
                  className="movie-rating"
                />
              </div>
            )}
          </DialogContent>
          <DialogActions className="dialogNavbar">
            <Button onClick={handleClose} sx={{ color: "#e50914" }}>
              Close
            </Button>
            <Button onClick={handleRateMovie} sx={{ color: "#e50914" }}>
              Next
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default SuggestionPage;
