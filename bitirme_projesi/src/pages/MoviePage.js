import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Accordion, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AiPage from "../components/ChatAi";
import axios from "axios";
import "../styling/MoviePage.css";

const API_KEY = "b920124b119c33ce96596988f22abbcf";

const MoviePage = () => {
  const [value, setValue] = useState(0);
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [averageUserScore, setAverageUserScore] = useState(0);
  const { id } = useParams();

  // Retrieve the user ID from localStorage
  const userId = localStorage.getItem("userId");

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
        console.log("Movie data:", response.data);
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
        console.log("Genres data:", response.data.genres);
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

    fetchMovie();
    fetchGenres();
    fetchVotes();
  }, [id]);

  const getGenreNames = (genreIds) => {
    if (!genreIds || !genres.length) return "";
    const genreNames = genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean);
    console.log("Genre names for IDs:", genreIds, genreNames);
    return genreNames.join(", ");
  };

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
      // Fetch votes again to update the average user score
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

  if (!movie) {
    console.log("Movie not found for ID:", id);
    return <div>Movie not found</div>;
  }

  const getRatingPhrase = (rating) => {
    if (rating <= 3.5) return "Overwhelming dislike";
    else if (rating <= 4.5) return "Generally unfavorable";
    else if (rating <= 8) return "Generally favorable";
    else return "Universal Acclaim";
  };

  const director =
    movie.credits?.crew?.find((member) => member.job === "Director")?.name ||
    "N/A";
  const cast =
    movie.credits?.cast
      ?.slice(0, 5)
      .map((actor) => actor.name)
      .join(", ") || "N/A";

  return (
    <>
      <div className="movie-page-container">
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
          </div>
        </div>
        <div className="info-container">
          <p className="director">Director: {director}</p>
          <p className="cast">Cast: {cast}</p>
          <p className="genre">
            Genre: {getGenreNames(movie.genres.map((genre) => genre.id))}
          </p>
          <p className="explanation">Overview: {movie.overview}</p>
        </div>
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
      </div>
    </>
  );
};

export default MoviePage;
