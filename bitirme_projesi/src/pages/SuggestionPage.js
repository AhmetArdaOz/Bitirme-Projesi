import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import { movieData } from '../constants/data';
import '../styling/SuggestionPage.css';
import {Container} from "@mui/material";

export default function SuggestionPage() {
    const [open, setOpen] = useState(false);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [watched, setWatched] = useState(false);
    const [rating, setRating] = useState(0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRateMovie = () => {
        if (watched) {
            // Implement logic to save rating
        }
        setCurrentMovieIndex(prevIndex => prevIndex + 1);
        setWatched(false);
        setRating(0);
    };

    const handleWatchedChange = (event) => {
        setWatched(event.target.checked);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const currentMovie = movieData[currentMovieIndex];

    if (!currentMovie) {
        return (
            <div className="suggestion-container">
                <Container classname="ResultContainer">
                    <Typography variant="h4" className="suggestion-title">
                    All set! Now you can press the go home button and enjoy the adventure!
                    <Button variant="contained" classname="Button" component={RouterLink} to="/home">Go Home</Button>
                    </Typography>
                </Container>
            </div>
        );
    }

    return (
        <div className="suggestion-container">
            <Typography variant="h4" className="suggestion-title">
                Welcome!
            </Typography>
            <Typography variant="body1" className="suggestion-message">
                Can you help us personalize your experience? As you rate ten movies, our algorithm will better understand your preferences and offer tailored recommendations. Even if you haven't seen some of them, your input is valuable.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Next
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth >
                <DialogTitle>{currentMovie.title}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Genre: {currentMovie.genre}
                    </Typography>
                    <img src={currentMovie.imageUrl} alt={currentMovie.title} style={{ maxWidth: '100%', marginTop: '10px' }} />
                    <FormControlLabel
                        control={<Checkbox checked={watched} onChange={handleWatchedChange} />}
                        label="I watched this movie"
                        style={{ marginTop: '20px' }}
                    />
                    {watched && (
                        <div style={{ marginTop: '20px' }}>
                            <Typography variant="body1" style={{ marginBottom: '10px' }}>Rate this movie:</Typography>
                            <Rating
                                value={rating}
                                precision={0.5}
                                onChange={handleRatingChange}
                                max={5}
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" >Close</Button>
                    <Button onClick={handleRateMovie} color="primary" disabled={!watched}>Next</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
