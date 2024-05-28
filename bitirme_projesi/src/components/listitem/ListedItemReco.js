import React from "react";
import { Link } from "react-router-dom";

import "./listeditem.css";

export default function ListedItemReco({ movie }) {
  if (!movie) {
    return null;
  }

  return (
    <Link to={`/moviepage/${movie.id}`} className="listItem-link">
      <div className="listItem">
        {movie.poster_path && (
          <img
            src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        )}
        <div className="itemInfo">
          <div className="itemInfoTop">
            <span>{movie.runtime} min</span>
            <span>{movie.title}</span>
            <span>
              (
              {movie.release_date && new Date(movie.release_date).getFullYear()}
              )
            </span>
          </div>
          <div className="desc">{movie.overview}</div>
          <div className="genre">
            {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}
          </div>
        </div>
      </div>
    </Link>
  );
}
