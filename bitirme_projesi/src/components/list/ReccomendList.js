import React, { useEffect, useState, useRef } from "react";
import ListedItemReco from "../listitem/ListedItemReco";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./listed.css";
import axios from "axios";

const TMDB_API_KEY = "b920124b119c33ce96596988f22abbcf";

export default function RecoList() {
  const [movieData, setMovieData] = useState([]);
  const [fetchedMovieIds, setFetchedMovieIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const isFetching = useRef(false);

  useEffect(() => {
    if (!isFetching.current) {
      isFetching.current = true;
      fetchUserVotes();
    }
  }, []);

  const fetchUserVotes = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage");
        setLoading(false);
        return;
      }

      console.log("Retrieved user ID from localStorage:", userId);

      const response = await axios.get("http://localhost:3000/api/v1/votes");
      console.log("API response:", response);

      const votes = response.data;
      if (!Array.isArray(votes)) {
        console.error("Votes data is not an array:", votes);
        setLoading(false);
        return;
      }

      console.log("Fetched votes:", votes);

      const userVotes = votes.filter((vote) => {
        console.log(`Processing vote: ${JSON.stringify(vote)}`);
        return vote.user_id == userId && vote.vote > 5;
      });

      console.log("Filtered user votes:", userVotes);

      if (userVotes.length > 0) {
        console.log(
          "Favorite movies:",
          userVotes.map((vote) => vote.movie_id)
        );

        for (const vote of userVotes) {
          await fetchMovieTitle(vote.movie_id);
        }
      } else {
        console.log("No votes above 5 for this user.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching votes:", error);
      setLoading(false);
    }
  };

  const fetchMovieTitle = async (movieId) => {
    if (fetchedMovieIds.has(movieId)) {
      console.log(`Movie ID ${movieId} already fetched. Skipping...`);
      return;
    }

    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      console.log(`Fetching movie title from URL: ${url}`);
      const response = await axios.get(url, {
        params: { api_key: TMDB_API_KEY },
      });

      const movieTitle = response.data.title;
      console.log(`Fetched movie title: ${movieTitle}`);

      setFetchedMovieIds((prevIds) => new Set(prevIds).add(movieId));
      await fetchRecommendations(movieTitle);
    } catch (error) {
      console.error("Error fetching movie title:", error);
      setLoading(false);
    }
  };

  const fetchRecommendations = async (movieTitle) => {
    if (!movieTitle) {
      console.error("No movie title provided");
      setLoading(false);
      return;
    }

    try {
      const encodedTitle = encodeURIComponent(movieTitle);
      console.log(`Fetching recommendations for movie title: ${encodedTitle}`);
      const response = await axios.get(`http://127.0.0.1:5000/recommend`, {
        params: { movie: encodedTitle },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      });

      console.log("Response from recommendation API:", response.data);

      if (
        response.data.recommended_movies_name &&
        response.data.recommended_movies_poster
      ) {
        const { recommended_movies_name, recommended_movies_poster } =
          response.data;

        const recommendedMovies = await Promise.all(
          recommended_movies_name.map(async (title, index) => {
            const movieId = await fetchMovieId(title);
            if (movieId && !fetchedMovieIds.has(movieId)) {
              const movie = await fetchMovieDetails(movieId);
              if (movie) {
                setFetchedMovieIds((prevIds) => new Set(prevIds).add(movieId));
              }
              return movie;
            } else {
              return null;
            }
          })
        );

        setMovieData((prevData) => [
          ...prevData,
          ...recommendedMovies.filter((movie) => movie !== null),
        ]);
      } else {
        console.error("Unexpected response structure:", response.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setLoading(false);
    }
  };

  const fetchMovieId = async (title) => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie`;
      console.log(`Fetching movie ID for title: ${title} from URL: ${url}`);
      const response = await axios.get(url, {
        params: {
          api_key: TMDB_API_KEY,
          query: title,
        },
      });

      if (response.data.results.length > 0) {
        return response.data.results[0].id;
      } else {
        console.error(`No movie ID found for title: ${title}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching movie ID for title ${title}:`, error);
      return null;
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      console.log(`Fetching movie details for ID: ${movieId} from URL: ${url}`);
      const response = await axios.get(url, {
        params: { api_key: TMDB_API_KEY },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ID ${movieId}:`, error);
      return null;
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
            <ListedItemReco key={index} movie={movie} index={index} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
