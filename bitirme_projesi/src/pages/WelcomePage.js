import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import NavBar from "../components/NavBar.js";
import "../styling/WelcomePage.css";
import Footer from "../components/Footer.js";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import Slide from "@mui/material/Slide";

export default function WelcomePage() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div id="welcomePageComponent">
      <NavBar></NavBar>

      <Slide in={true} direction="down" timeout={1000}>
        <Box id="upperContentBox">
          <Box id="upperContent">
            <Fade in={true} timeout={1500}>
              <Typography
                id="upperContentHeader1"
                sx={{ textShadow: "2px 2px black" }}
              >
                Welcome to MovieHub
              </Typography>
            </Fade>

            <Fade in={true} timeout={2000}>
              <Typography id="upperContentHeader2">
                Discover your next favorite movie.
              </Typography>
            </Fade>
          </Box>
          <Box id="buttonContainer">
            <Zoom in={true} timeout={2500}>
              <Button
                color="error"
                id="signInButton"
                variant="contained"
                component={RouterLink}
                to="/signin"
                fullWidth
              >
                Let's Get Started
              </Button>
            </Zoom>
          </Box>
          <div class="background"></div>
        </Box>
      </Slide>

      <div id="accordion">
        <Fade in={true} timeout={3000}>
          <Typography
            id="accordionHeader"
            variant="h2"
            component="h2"
            gutterBottom
          >
            Frequently Asked Questions
          </Typography>
        </Fade>
        <Grid className="accordionGrid">
          <Fade in={true} timeout={3500}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>What is this website about?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our website is a platform where users can score and comment on
                  movies. Additionally, it features a chatbot for real-time
                  assistance and a recommendation system to help you find movies
                  you'll love.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Fade>

          <Fade in={true} timeout={4000}>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>How do I score and comment on movies?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  To score and comment on movies, you need to create an account
                  and log in. Once logged in, navigate to the movie page you
                  want to score or comment on. You will find options to rate the
                  movie and leave your comments.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Fade>

          <Fade in={true} timeout={4500}>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography>
                  What is the chatbot and how can I use it?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The chatbot is a feature that provides real-time assistance to
                  users. You can ask the chatbot questions about movies, get
                  recommendations, or seek help with navigating the website. To
                  use the chatbot, simply click on the chat icon located at the
                  bottom right corner of the screen.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Fade>

          <Fade in={true} timeout={5000}>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
              >
                <Typography>
                  How does the recommendation system work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our recommendation system analyzes your movie ratings and
                  comments, as well as your viewing history, to suggest movies
                  you might enjoy. The more you interact with the website by
                  rating and commenting on movies, the more accurate the
                  recommendations will become.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Fade>

          <Fade in={true} timeout={5500}>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel5-content"
                id="panel5-header"
              >
                <Typography>Is my data safe on this website?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, your data is safe with us. We use industry-standard
                  encryption and security protocols to protect your personal
                  information. We are committed to safeguarding your privacy and
                  ensuring your data is secure.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Fade>
        </Grid>
      </div>
    </div>
  );
}
