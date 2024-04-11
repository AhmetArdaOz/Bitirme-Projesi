import React from "react";
import { Typography, Container } from "@mui/material";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { movieData } from "../constants/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styling/MainPage.css";

export default function MainPage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <div className="App">
            <Container className="MainContent">
                <Typography className="title" variant="h2" component="h2" style={{fontSize:"30px"}}>
                    Featured Movies
                </Typography>
                <Slider {...settings}>
                    {movieData.map((movie) => (
                        <div key={movie.id} className="MovieCard">
                            <Card className="MovieCard-Container">
                                <CardActionArea>
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
                                            variant="body2"
                                            color="textSecondary"
                                            className="MovieCard-Genre"
                                        >
                                            Genre: {movie.genre}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </Container>
            <List></List>
            <List></List>
            <List></List>
            <List></List>
        </div>
    );
}
