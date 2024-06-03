import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export default function MovieManagement() {
  const [movieItem, setMovieItem] = useState({
    title: "",
    description: "",
    genre: "",
    thumbnailUrl: "",
    trailerUrl: "",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Add Movie</h2>
      <Accordion>
        <AccordionSummary>Movie Item</AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Title"
            value={movieItem.title}
            onChange={(e) =>
              setMovieItem((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />

          <TextField
            label="Description"
            value={movieItem.description}
            onChange={(e) =>
              setMovieItem((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />

          <TextField
            label="Thumbnail URL"
            value={movieItem.thumbnailUrl}
            onChange={(e) =>
              setMovieItem((prev) => ({
                ...prev,
                thumbnailUrl: e.target.value,
              }))
            }
          />
          <TextField
            label="TrailerUrl"
            value={movieItem.trailerUrl}
            onChange={(e) =>
              setMovieItem((prev) => ({
                ...prev,
                trailerUrl: e.target.value,
              }))
            }
          />
        </AccordionDetails>
      </Accordion>
      <Button
        sx={{
          backgroundColor: "#e50914",
          "&:hover": { backgroundColor: "#e34149" },
        }}
        variant="contained"
        color="primary"
      >
        Create Movie
      </Button>
    </div>
  );
}
