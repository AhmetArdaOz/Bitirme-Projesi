import React from "react";
import { Typography, Container, Accordion } from "@mui/material";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { movieData } from "../constants/data";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styling/MainPage.css";
import { Link as RouterLink } from "react-router-dom";
import AiPage from "../components/ChatAi";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function MainPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="App">
      <Container className="MainContent">
        <Typography
          className="title"
          variant="h2"
          component="h2"
          style={{ fontSize: "30px" }}
        >
          Featured Movies
        </Typography>
        <Slider {...settings}>
          {movieData.map((movie) => (
            <div key={movie.id} className="MovieCard">
              <Card className="MovieCard-Container">
                <CardActionArea
                  component={RouterLink}
                  to={`/moviepage/${movie.id}`}
                >
                  <CardMedia
                    component="img"
                    image={movie.imageUrl}
                    alt={movie.title}
                    className="MovieCard-Image"
                  />
                  <CardContent className="MovieCard-Content">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="MovieCard-Title"
                    >
                      {movie.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      component="div"
                      className="MovieCard-Title"
                    >
                      Director: {movie.director}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="MovieCard-Genre"
                    >
                      Genre: {movie.genre}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Rating
                  name="simple-controlled"
                  precision={0.5}
                  value={movie.rating || 0}
                  readOnly
                />
              </Card>
            </div>
          ))}
        </Slider>

        <Typography
          className="title"
          variant="h2"
          component="h2"
          style={{ fontSize: "30px" }}
        >
          Featured Movies
        </Typography>
        <Slider {...settings}>
          {movieData.map((movie) => (
            <div key={movie.id} className="MovieCard">
              <Card className="MovieCard-Container">
                <CardActionArea
                  component={RouterLink}
                  to={`/moviepage/${movie.id}`}
                >
                  <CardMedia
                    component="img"
                    image={movie.imageUrl}
                    alt={movie.title}
                    className="MovieCard-Image"
                  />
                  <CardContent className="MovieCard-Content">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="MovieCard-Title"
                    >
                      {movie.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      component="div"
                      className="MovieCard-Title"
                    >
                      Director: {movie.director}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="MovieCard-Genre"
                    >
                      Genre: {movie.genre}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Rating
                  name="simple-controlled"
                  precision={0.5}
                  value={movie.rating || 0}
                  readOnly
                />
              </Card>
            </div>
          ))}
        </Slider>
        <div className="aipage">
          <Accordion sx={{ backgroundColor: "#1c1c1c", color: "white" }}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon sx={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ color: "white" }}
            >
              <Typography>Talk to ChatBot</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AiPage />
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
    </div>
  );
}
