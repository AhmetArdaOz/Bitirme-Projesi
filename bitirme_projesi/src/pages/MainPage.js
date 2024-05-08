import React from "react";
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

export default function MainPage() {
  return (
    <>
      <div className="home">
        <Featured></Featured>
        <Listed></Listed>
        <Listed></Listed>
        <Listed></Listed>
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
