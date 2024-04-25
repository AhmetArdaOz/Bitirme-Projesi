import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  Accordion
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import theme from "../components/theme/theme";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AiPage from "../components/ChatAi";
import "../styling/Support.css"

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handleMessage = () => {
    setMessageSent(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="Container-main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          maxWidth: "800px",
          width: "100%",
          marginTop: "100px",
        }}
      >
        <Typography
          variant="h4"
          style={{ marginBottom: "32px" }}
          align="center"
        >
          You Have a Problem? Let Us Know!
        </Typography>

        {messageSent ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CheckCircleOutlineIcon
              style={{ color: "green", fontSize: "48px", marginBottom: "16px" }}
            />
            <Typography variant="h5" style={{ marginBottom: "16px" }}>
              Message Sent Successfully!
            </Typography>
            <Typography>
              Thank you for reaching out. We will get back to you soon.
            </Typography>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <form
              style={{ width: "70%" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleMessage();
              }}
            >
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  marginBottom: "16px",
                  backgroundColor: "#333",
                  color: "aliceblue",
                }}
                InputLabelProps={{
                  style: {
                    color: "aliceblue",
                  },
                }}
                inputProps={{
                  style: {
                    color: "white",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  marginBottom: "16px",
                  backgroundColor: "#333",
                  color: "aliceblue",
                }}
                InputLabelProps={{
                  style: {
                    color: "aliceblue",
                  },
                }}
                inputProps={{
                  style: {
                    color: "white",
                  },
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Message"
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  marginBottom: "16px",
                  backgroundColor: "#333",
                  color: "aliceblue",
                }}
                InputLabelProps={{
                  style: {
                    color: "aliceblue",
                  },
                }}
                inputProps={{
                  style: {
                    color: "white",
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Send Message
              </Button>
            </form>
          </div>
        )}
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
    </ThemeProvider>
  );
};

export default ContactUs;
