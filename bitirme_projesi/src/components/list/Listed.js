import React, { useEffect, useState } from "react";
import { movieData } from "../../constants/data";
import ListedItem from "../listitem/ListedItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./listed.css";
import axios from "axios";

export default function Listed() {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "b920124b119c33ce96596988f22abbcf";
  const MOVIE_COUNT = 5000;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    const totalPages = Math.ceil(MOVIE_COUNT / 50);

    for (let page = 1; page < totalPages; page++) {
      axios
        .get(`https://api.themoviedb.org/3/movie/popular`, {
          params: {
            api_key: API_KEY,
            page: page,
          },
        })
        .then((response) => response.data)
        .then((data) => {
          if (data) {
            setMovieData([...movieData, ...data.results]);
          }
        });
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="list">
      <div
        className="listedItems"
        style={{ marginLeft: "25px", marginTop: "10px" }}
      >
        <Slider {...settings}>
          {movieData.map((movie, index) => (
            <ListedItem key={movie.id} movie={movie} index={index} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
