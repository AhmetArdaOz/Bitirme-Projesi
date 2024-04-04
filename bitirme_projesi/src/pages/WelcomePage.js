import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../styling/WelcomePage.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MainBar from "../components/AppBar.js";

export default function WelcomePage() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  useEffect(() => {
    const enhance = () => {
      const element = document.getElementById("channel-link");
      if (element) {
        const text = element.innerText.split("");

        element.innerText = "";

        text.forEach((value, index) => {
          const outer = document.createElement("span");

          outer.className = "outer";

          const inner = document.createElement("span");

          inner.className = "inner";

          inner.style.animationDelay = `${rand(-5000, 0)}ms`;

          const letter = document.createElement("span");

          letter.className = "letter";

          letter.innerText = value;

          letter.style.animationDelay = `${index * 1000}ms`;

          inner.appendChild(letter);

          outer.appendChild(inner);

          element.appendChild(outer);
        });
      }
    };

    enhance();
  }, []);

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  return (
    <Container className="welcomePageComponent" maxWidth="sm">
      <MainBar></MainBar>
      <Container className="mainContent">
      
      <Box className="welcomeMessage" sx={{ my: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Welcome to Bitirme
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
        </Typography>
        <Grid className="signInButtonGrid" container spacing={2} sx={{ mt: 3 }}>
          <Grid classitem xs={12} md={6}>
            <Button
              className="signInButton"
              variant="contained"
              component={RouterLink}
              to="/signin"
              fullWidth
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Box>
              <div id="text">
              <div className="line">
                <p className="word">Allow </p>
                <p className="word">us</p>
              </div>

              <div className="line">
                <p className="word">to</p>

              </div>

              <div className="line">
                <p className="word">introduce</p>
              </div>
              
              <div className="line">
                <a 
                  id="channel-link" 

                  // aboutus sayfasına yönlendirmesi lazım 
                  // veya herhangi bir yere ayarlanabilir
                  href="" 
                  target="_blank" 
                  className="word fancy"
                >
                  ourselves
                </a>
              </div>
            </div>
      

          <div class="screen">  
          <div class="screen-image"></div>  
          <div class="screen-overlay"></div>  
          <div class="screen-content">
            <div class="screen-user">
              <span class="name">BİTİRME</span>
              <a class="link" href="" target="_blank">bitirme projesi</a>
            </div>
          </div>
        </div>


      <Typography className="accordionHeader" variant="h2" component="h2" gutterBottom>
          Accordion Section
      </Typography>
      <Grid className="accordionGrid">
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography>Accordion 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography>Accordion 4</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            <Typography>Accordion 5</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      </Container>
    </Container>
  );
}
