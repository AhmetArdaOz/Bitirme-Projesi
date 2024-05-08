import React from "react";
import { movieData } from "../../constants/data";
import ListedItem from "../listitem/ListedItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./listed.css";

export default function Listed() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  return (
    <div className="list">
      <span className="listTitle">Continue to watch</span>
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
