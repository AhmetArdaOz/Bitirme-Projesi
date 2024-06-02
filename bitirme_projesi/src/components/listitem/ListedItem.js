import React from "react";
import { Link } from "react-router-dom";

import "./listeditem.css";

export default function ListedItem({ movie }) {
  if (!movie) {
    return null;
  }

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

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
            <span>{movie.title}</span>
            <span>
              (
              {movie.release_date && new Date(movie.release_date).getFullYear()}
              )
            </span>
          </div>
          <div className="desc">{truncateText(movie.overview, 200)}</div>
          <div className="genre">
            {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}
          </div>
        </div>
      </div>
    </Link>
  );
}
