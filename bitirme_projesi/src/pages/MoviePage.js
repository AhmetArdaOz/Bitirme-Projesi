import React from 'react';
import { movieData } from '../constants/data';
import '../styling/MoviePage.css';
import { useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';

const MoviePage = () => {
    const { id } = useParams();

    // Find movie object with matching ID
    const movie = movieData.find(movie => movie.id === parseInt(id));

    if (!movie) {
        console.log("Movie not found for ID:", id);
        return <div>Movie not found</div>;
    }

    console.log("Found Movie:", movie);

    return (
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
                <p className="genre">Genre: {movie.genre}</p>
                <p className="explanation">{movie.explanation}</p>
                {/* Display Rating */}
                <Rating
                    name="movie-rating"
                    value={movie.rating || 0}
                    readOnly
                />
            </div>
        </div>
    );
};

export default MoviePage;
