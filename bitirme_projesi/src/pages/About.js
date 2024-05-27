import { Typography, Container, Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React from "react";
import AiPage from "../components/ChatAi";
import "../styling/About.css";

export default function About() {
  return (
    <Container
      style={{
        paddingTop: "2rem",
        paddingBottom: "2rem",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <Typography
        variant="h1"
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#FFFFFF",
        }}
        gutterBottom
      >
        About MovieHub
      </Typography>
      <Typography
        variant="body1"
        style={{
          fontSize: "1.2rem",
          marginBottom: "1.5rem",
          color: "#FFFFFF",
        }}
        paragraph
      >
        Welcome to our movie blog, where cinematic passion meets insightful
        analysis! Dive into the captivating world of cinema with us as we
        explore the latest releases, timeless classics, and everything in
        between. From thought-provoking reviews to behind-the-scenes glimpses,
        our platform is your one-stop destination for all things film. Whether
        you're a casual moviegoer or a die-hard cinephile, our diverse range of
        content caters to every taste and interest. Join our community of film
        enthusiasts as we embark on a journey through the magic of storytelling
        and the power of visual artistry. Lights, camera, action – let's
        discover the wonders of cinema together!
      </Typography>
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
    </Container>
  );
}
