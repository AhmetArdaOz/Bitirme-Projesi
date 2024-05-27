import React, { useEffect, useState } from "react";
import ListedItem from "../listitem/ListedItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./listed.css";
import axios from "axios";

export default function Listed({ genreId }) {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "b920124b119c33ce96596988f22abbcf";

  useEffect(() => {
    fetchMovies();
  }, [genreId]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: API_KEY,
            with_genres: genreId,
          },
        }
      );
      setMovieData(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
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
          {movieData.map((movie) => (
            <ListedItem key={movie.id} movie={movie} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
