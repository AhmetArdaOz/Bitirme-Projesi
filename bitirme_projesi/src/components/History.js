import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Grid,
  CardMedia,
  Fade,
  Zoom,
} from "@mui/material";
import "../styling/History.css";

const API_KEY = "b920124b119c33ce96596988f22abbcf";

const HistoryPage = () => {
  const [votesWithMovies, setVotesWithMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        if (!userId) {
          setError("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        console.log("Fetching votes for user ID:", userId);

        const response = await axios.get(
          `http://localhost:3000/api/v1/votes/user/${userId}`
        );
        console.log("API response status:", response.status);
        console.log("API response data:", response.data);

        const votes = response.data.filter((vote) => vote.vote !== 0); // Filter out votes with a value of 0

        const moviePromises = votes.map((vote) =>
          fetchMovieDetails(vote.movie_id).then((movie) => ({
            vote: vote.vote,
            movie,
          }))
        );
        const votesWithMovies = await Promise.all(moviePromises);
        setVotesWithMovies(votesWithMovies);
      } catch (error) {
        console.error("Error fetching votes:", error);
        setError("Failed to fetch votes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();
  }, [userId]);

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ID ${movieId}:`, error);
      return null;
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container className="history-container">
      <Zoom in={true} timeout={1000}>
        <Typography variant="h4" component="h1" gutterBottom>
          Voting History
        </Typography>
      </Zoom>
      {votesWithMovies.length === 0 ? (
        <Typography>No votes found.</Typography>
      ) : (
        <Grid container className="movie-container" spacing={3}>
          {votesWithMovies.map(({ vote, movie }, index) => (
            <Fade in={true} timeout={(index + 1) * 500} key={index}>
              <Grid item className="movie-card-wrapper">
                <Card className="movie-card">
                  {movie && (
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-card-image"
                    />
                  )}
                  <CardContent className="movie-card-content">
                    <Typography variant="h6" className="movie-card-title">
                      {movie ? movie.title : "Unknown Movie"}
                    </Typography>
                    <Typography variant="body1" className="movie-card-vote">
                      Your Vote: {vote}
                    </Typography>
                    {movie && (
                      <Typography variant="body2" className="movie-card-genre">
                        Genres:{" "}
                        {movie.genres.map((genre) => genre.name).join(", ")}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Fade>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HistoryPage;
