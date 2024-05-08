import React from "react";

import "./listeditem.css";
import { Link } from "react-router-dom";

export default function ListedItem({ movie }) {
  if (!movie) {
    return null;
  }

  return (
    <Link to={`/moviepage/${movie.id}`} className="listItem-link">
      <div className="listItem">
        {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} />}
        <div className="itemInfo">
          <div className="itemInfoTop">
            <span>{movie.runtime}</span>
            <span>
              {movie.title} {""}
            </span>
            <span>({movie.year})</span>
          </div>
          <div className="desc">{movie.cast}</div>
          <div className="genre">{movie.genre}</div>
        </div>
      </div>
    </Link>
  );
}
