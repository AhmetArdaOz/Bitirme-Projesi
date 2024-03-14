import React from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../styling/WelcomePage.css"

export default function WelcomePage() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h1" component="h1" gutterBottom>
                    Welcome to Bitirme
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                    Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
                </Typography>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12} md={6}>
                        <Button
                            className="SignInButton"
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
        </Container>
    );
}
