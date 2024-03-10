import React from "react";
import {
  Typography,
  Container,
} from "@mui/material";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { movieData } from "../constants/data";
import "../styling/MainPage.css";

export default function MainPage() {
  return (
      <div className="App">
        <Container className="MainContent">
          <div className="MovieList">
            {movieData.map((movie) => (
                <Card key={movie.id} className="MovieCard">
                  <CardActionArea>
                    <CardMedia
                        component="img"
                        height="500"
                        image={movie.imageUrl}
                        alt={movie.title}
                        className="MovieCard-Image"
                    />
                    <CardContent className="MovieCard-Content">
                      <Typography gutterBottom variant="h5" component="div" className="MovieCard-Title">
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="MovieCard-Genre">
                        Genre: {movie.genre}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
            ))}
          </div>
        </Container>
      </div>
  );
}
