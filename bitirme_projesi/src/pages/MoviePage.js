import React from "react";
import { movieData } from "../constants/data";
import "../styling/MoviePage.css";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Accordion, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AiPage from "../components/ChatAi";

const MoviePage = () => {
  const [value, setValue] = React.useState(0);
  const { id } = useParams();

  const movie = movieData.find((movie) => movie.id === parseInt(id));

  if (!movie) {
    console.log("Movie not found for ID:", id);
    return <div>Movie not found</div>;
  }

  const getRatingPhrase = (rating) => {
    if (rating <= 1.5) return "Overwhelming dislike";
    else if (rating <= 2.5) return "Generally unfavorable";
    else if (rating <= 3.5) return "Generally favorable";
    else return "Universal Acclaim";
  };

  return (
    <>
      <div className="movie-page-container">
        <div className="movie-page-rating">
          <div className="trailer-container">
            {/* picture */}
            <iframe
              className="trailer-video"
              src={movie.trailerUrl}
              title={movie.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          {/* rating */}
          <div className="rating-container">
            <h2 className="title">{movie.title}</h2>

            <p className="rating-general-title">METASCORE</p>
            <p className="rating-general">{getRatingPhrase(movie.rating)}</p>

            <Rating
              name="movie-rating-general"
              value={movie.rating || 0}
              precision={0.5}
              readOnly
            />

            <p className="rating-user-title">USER SCORE</p>
            <p className="rating-user">{getRatingPhrase(movie.rating)}</p>
            <Rating
              name="movie-rating-user"
              value={movie.rating || 0}
              precision={0.5}
              readOnly
            />

            <p className="rating-personal-title">My Score</p>
            <p className="rating-personal">{getRatingPhrase(value)}</p>
            <Rating
              name="movie-rating-personal"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
        </div>
        {/* info */}
        <div className="info-container">
          <p className="director">Director: {movie.director}</p>
          <p className="cast">Cast:{movie.cast}</p>
          <p className="genre">Genre: {movie.genre}</p>
          <p className="explanation">{movie.explanation}</p>
        </div>

        {/* Ai chatbot */}
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
