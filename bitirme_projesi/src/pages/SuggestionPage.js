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
import { movieData } from "../constants/data";
import "../styling/SuggestionPage.css";
import { Container } from "@mui/material";

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
    const shuffledMovies = shuffleArray(movieData);
    const selectedMovies = shuffledMovies.slice(0, 10);
    setMovies(selectedMovies);
  }, []);

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

  const handleRateMovie = () => {
    const updatedMovies = [...movies];
    if (watched) {
      updatedMovies[currentMovieIndex].rating = rating;
    }
    setCurrentMovieIndex((prevIndex) => prevIndex + 1);
    setMovies(updatedMovies);
    setWatched(false);
    setRating(0);
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
          <Typography variant="h4" className="suggestion-title">
            All set {userName}! Now you can press the go home button and enjoy
            the adventure!
          </Typography>
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
        Welcome {userName} {userLastName} !
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
              src={currentMovie.imageUrl}
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
                  precision={0.5}
                  onChange={handleRatingChange}
                  max={5}
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
