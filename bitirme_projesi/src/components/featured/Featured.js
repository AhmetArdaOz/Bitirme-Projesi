import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import "./featured.css";
import { Link } from "react-router-dom";

export default function Featured() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "b920124b119c33ce96596988f22abbcf";

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular`,
        {
          params: {
            api_key: API_KEY,
            page: 1,
          },
        }
      );

      const movies = response.data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      setFeaturedMovie(movies[randomIndex]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !featuredMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="featured">
      <img
        src={`https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}`}
        alt={featuredMovie.title}
      />
      <div className="info">
        <p className="title">{featuredMovie.title}</p>
        <span className="desc-featured">{featuredMovie.overview}</span>
        <div className="buttons">
          <Link to={`/moviepage/${featuredMovie.id}`}>
            <button className="play">
              <PlayArrowIcon />
              <span>Explore</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
