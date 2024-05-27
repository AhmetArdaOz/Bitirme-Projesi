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
import Featured from "../components/featured/Featured";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      navigate("/signin");
      console.log("Error occured can't go to MainPage");
    }
  }, [authenticated]);

  return (
    <>
      <div className="home">
        <Featured></Featured>
        <h2 className="recomend-title">
          According to your ratings you should watch them
        </h2>
        <Listed></Listed>
        <h2 className="genre-title">Watch this Genre</h2>
        <Listed></Listed>
        <h2 className="genre-title">Watch this Genre</h2>
        <Listed></Listed>
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
