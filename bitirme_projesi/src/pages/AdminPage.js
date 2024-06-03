import React from "react";
import { Tabs, Tab, Box, Container, ThemeProvider } from "@mui/material";
import UserManagement from "../components/UserManagement";
import MovieManagement from "../components/MovieManagement";
import FeedbackManagement from "../components/FeedbackManagement";
import VoteManagement from "../components/VoteManagement";
import theme from "../components/theme/theme";
import { Accordion, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AiPage from "../components/ChatAi";

export default function AdminPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h2 style={{ color: "white", marginLeft: 20, marginTop: "100px" }}>
          Admin Page
        </h2>
        <Box sx={{ width: "100%", marginTop: "50px" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Movie Management" style={{ color: "white" }} />
            <Tab label="User Management" style={{ color: "white" }} />
            <Tab label="Vote Management" style={{ color: "white" }} />
            <Tab label="Feedback Management" style={{ color: "white" }} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <MovieManagement />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserManagement />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <VoteManagement />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <FeedbackManagement />
        </TabPanel>
      </Container>
    </ThemeProvider>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
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
    </div>
  );
}
