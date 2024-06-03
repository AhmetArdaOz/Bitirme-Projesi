import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, CardContent, Typography, Grid } from "@mui/material";
import "../styling/FeedbackManagement.css";

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/feedback"
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <Container>
      <h2 className="title">User Feedbacks</h2>
      <Grid container spacing={3}>
        {feedbacks.map((feedback) => (
          <Grid item xs={12} sm={6} md={4} key={feedback.id}>
            <Card sx={{ backgroundColor: "white", color: "black" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User's Name: {""}
                  {feedback.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Mail of user: {""}
                  {feedback.email}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                  Feedback:{""}
                  {feedback.message}
                </Typography>
                <Typography variant="h8" display="block" gutterBottom>
                  Sent in: {""}
                  {new Date(feedback.created_at).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
