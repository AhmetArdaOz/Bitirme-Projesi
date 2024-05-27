import React, { useEffect, useState } from "react";
import { Typography, Accordion } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styling/MainPage.css";
import AiPage from "../components/ChatAi";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Listed from "../components/list/Listed";
import RecoList from "../components/list/ReccomendList";
import Featured from "../components/featured/Featured";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [genres, setGenres] = useState([]);
  const [randomGenres, setRandomGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      navigate("/signin");
      console.log("Error occured can't go to MainPage");
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list`,
        {
          params: {
            api_key: "b920124b119c33ce96596988f22abbcf",
          },
        }
      );
      setGenres(response.data.genres);
      selectRandomGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const selectRandomGenres = (genres) => {
    const shuffled = genres.sort(() => 0.5 - Math.random());
    setRandomGenres(shuffled.slice(0, 2));
  };

  if (!authenticated) return null;

  return (
    <>
      <div className="home">
        <Featured />
        <h2 className="recomend-title">
          According to your ratings you should watch them
        </h2>
        <RecoList />
        {randomGenres.map((genre) => (
          <div key={genre.id}>
            <h2 className="genre-title">Watch this Genre: {genre.name}</h2>
            <Listed genreId={genre.id} />
          </div>
        ))}
      </div>
      <div className="aipage">
        <Accordion sx={{ backgroundColor: "#1c1c1c", color: "white" }}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon sx={{ color: "white" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ color: "white" }}
          >
            <Typography>Talk to Famous Movie Stars</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AiPage />
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
