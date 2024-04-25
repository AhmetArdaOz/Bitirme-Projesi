import React from 'react';
import { movieData } from '../constants/data';
import '../styling/MoviePage.css';
import { useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { Accordion,Typography } from '@mui/material';
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AiPage from '../components/ChatAi';

const MoviePage = () => {
    const { id } = useParams();


    const movie = movieData.find(movie => movie.id === parseInt(id));

    if (!movie) {
        console.log("Movie not found for ID:", id);
        return <div>Movie not found</div>;
    }

    console.log("Found Movie:", movie);

    return (
        <>
        <div className="movie-page-container">
            <div className="trailer-container">
                {/* Embedded YouTube trailer */}
                <iframe
                    className="trailer-video"
                    src={movie.trailerUrl}
                    title={movie.title}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="info-container">
                <h2 className="title">{movie.title}</h2>
                <p className="director">Director: {movie.director}</p>
                <p className="cast">Cast:{movie.cast}</p>
                <p className="genre">Genre: {movie.genre}</p>
                <p className="explanation">{movie.explanation}</p>

                <Rating
                    name="movie-rating"
                    value={movie.rating || 0}
                    readOnly
                />
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
