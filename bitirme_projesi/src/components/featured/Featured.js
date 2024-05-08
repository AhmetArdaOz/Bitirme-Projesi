import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { movieData } from "../../constants/data";
import "./featured.css";

export default function Featured() {
  const featuredMovie = movieData[0];

  return (
    <div className="featured">
      <img src={featuredMovie.imageUrl} alt={featuredMovie.title} />
      <div className="info">
        <p className="title">{featuredMovie.title}</p>
        <span className="desc">{featuredMovie.explanation}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon />
            <span>Explore</span>
          </button>
        </div>
      </div>
    </div>
  );
}
