import React, { useEffect, useState, forwardRef } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Zoom,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Slide,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AiPage from "../components/ChatAi";
import axios from "axios";
import "../styling/MoviePage.css";
import Rating from "@mui/material/Rating";

const API_KEY = "b920124b119c33ce96596988f22abbcf";

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom in={true} ref={ref} {...props} />;
});

const MoviePage = () => {
  const [value, setValue] = useState(0);
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [averageUserScore, setAverageUserScore] = useState(0);
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: API_KEY,
              append_to_response: "credits",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

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

    const fetchVotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/votes");
        const votes = response.data.filter(
          (vote) => vote.movie_id === parseInt(id)
        );
        if (votes.length > 0) {
          const average =
            votes.reduce((sum, vote) => sum + vote.vote, 0) / votes.length;
          setAverageUserScore(average);
        } else {
          setAverageUserScore(0);
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/comments/${id}`
        );
        setComments(response.data);
        console.log("Fetched comments:", response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchMovie();
    fetchGenres();
    fetchVotes();
    fetchComments();
  }, [id]);

  const handleVoteChange = async (event, newValue) => {
    setValue(newValue);
    try {
      await axios.post("http://localhost:3000/api/v1/votes", {
        votes: [
          {
            user_id: userId,
            movie_id: parseInt(id),
            vote: newValue,
          },
        ],
      });
      const response = await axios.get("http://localhost:3000/api/v1/votes");
      const votes = response.data.filter(
        (vote) => vote.movie_id === parseInt(id)
      );
      if (votes.length > 0) {
        const average =
          votes.reduce((sum, vote) => sum + vote.vote, 0) / votes.length;
        setAverageUserScore(average);
      } else {
        setAverageUserScore(0);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      console.log("Submitting comment with userName:", userName);
      await axios.post("http://localhost:3000/api/v1/comments", {
        user_id: userId,
        movie_id: parseInt(id),
        comment,
        vote: parseFloat(value),
        username: userName,
      });
      setComment("");
      setOpen(false);
      const response = await axios.get(
        `http://localhost:3000/api/v1/comments/${id}`
      );
      setComments(response.data);
      console.log("Comments after submitting:", response.data);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getGenreNames = (genreIds) => {
    if (!genreIds || !genres.length) return "";
    const genreNames = genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean);
    return genreNames.join(", ");
  };

  const getRatingPhrase = (rating) => {
    if (rating <= 3.5) return "Overwhelming dislike";
    else if (rating <= 4.5) return "Generally unfavorable";
    else if (rating <= 6.5) return "Mixed or Average";
    else if (rating <= 8) return "Generally favorable";
    else return "Universal Acclaim";
  };

  const director =
    movie?.credits?.crew?.find((member) => member.job === "Director")?.name ||
    "N/A";
  const cast =
    movie?.credits?.cast
      ?.slice(0, 5)
      .map((actor) => actor.name)
      .join(", ") || "N/A";

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <>
      <div className="movie-page-container">
        <Slide direction="up" in={true} timeout={1000}>
          <div className="movie-page-rating">
            <div className="image-container">
              <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className="rating-container">
              <h2 className="title">{movie.title}</h2>
              <p className="rating-general-title">Media Score</p>
              <p className="rating-general">
                {getRatingPhrase(movie.vote_average)}
              </p>
              <Rating
                name="movie-rating-general"
                sx={{ color: "#e50914" }}
                value={movie.vote_average || 0}
                precision={0.5}
                max={10}
                readOnly
              />
              <p className="rating-user-title">User Score</p>
              <p className="rating-user">{getRatingPhrase(averageUserScore)}</p>
              <Rating
                name="movie-rating-user"
                sx={{ color: "#e50914" }}
                value={averageUserScore || 0}
                max={10}
                precision={0.5}
                readOnly
              />
              <p className="rating-personal-title">My Score</p>
              <p className="rating-personal">{getRatingPhrase(value)}</p>
              <Rating
                name="movie-rating-personal"
                sx={{ color: "#e50914" }}
                value={value}
                precision={0.5}
                max={10}
                onChange={handleVoteChange}
              />
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                className="comment-button"
              >
                Make a Comment
              </Button>
            </div>
          </div>
        </Slide>
        <Fade in={true} timeout={1500}>
          <div className="info-container">
            <p className="director">Director: {director}</p>
            <p className="cast">Cast: {cast}</p>
            <p style={{ marginBottom: "10px", fontSize: "18px" }}>
              Genre: {getGenreNames(movie.genres.map((genre) => genre.id))}
            </p>
            <p className="explanation">Overview: {movie.overview}</p>
          </div>
        </Fade>

        <Fade in={true} timeout={2000}>
          <div className="comments-section">
            <h3>Comments</h3>
            <div className="comments-grid">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-container">
                    <p>
                      <strong>{comment.username}</strong>
                    </p>
                    <p>Vote: {comment.vote}</p>
                    <p>{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </Fade>

        {/* ChatBot */}
        <Zoom in={true} timeout={2500}>
          <div className="aipage">
            <Accordion sx={{ backgroundColor: "#1c1c1c", color: "white" }}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon sx={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  color: "white",
                  backgroundColor: "#2c2c2c",
                  borderTop: "1px solid #444",
                }}
              >
                <Typography>Talk to ChatBot</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AiPage />
              </AccordionDetails>
            </Accordion>
          </div>
        </Zoom>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        className="comment-dialog"
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ color: "white !important" }}>
          Make a Comment
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="comment-textfield"
            sx={{
              "& .MuiInput-underline:before": {
                borderBottomColor: "#e50914",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#e50914",
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "#e50914",
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: "#e50914",
              },
              "& .MuiInputLabel-root": {
                color: "#e50914",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
                opacity: 1,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="comment-dialog-button">
            Cancel
          </Button>
          <Button
            onClick={handleCommentSubmit}
            className="comment-dialog-button"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MoviePage;
