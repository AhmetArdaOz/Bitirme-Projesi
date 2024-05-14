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

export default function WelcomePage() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div id="welcomePageComponent">
      <NavBar></NavBar>

      <Box id="upperContentBox">
        <Box id="upperContent">
          <Typography id="upperContentHeader1">Welcome to BİTİRME</Typography>

          <Typography id="upperContentHeader2">
            Unlimited movies, TV shows, and more. Watch anywhere. Cancel
            anytime.
          </Typography>
        </Box>
        <Box id="buttonContainer">
          <Button
            color="error"
            id="signInButton"
            variant="contained"
            component={RouterLink}
            to="/signin"
            fullWidth
          >
            Sign In
          </Button>
        </Box>
        <div class="background"></div>
      </Box>

      <div id="accordion">
        <Typography
          id="accordionHeader"
          variant="h2"
          component="h2"
          gutterBottom
        >
          Frequently Asked Questions
        </Typography>
        <Grid className="accordionGrid">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography>Accordion 3</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel4-content"
              id="panel4-header"
            >
              <Typography>Accordion 4</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel5-content"
              id="panel5-header"
            >
              <Typography>Accordion 5</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </div>

      <div id="line"></div>
      <Footer></Footer>
    </div>
  );
}
