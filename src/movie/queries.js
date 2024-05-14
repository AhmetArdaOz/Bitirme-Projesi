const getMovies = "SELECT * FROM movies";
const getMovieById = "SELECT * FROM movies WHERE id =$1";
const addMovie =
  "INSERT INTO users (budget, genres, homepage, keywords, original_language, original_title, overview, popularity, production_companies, production_countries, release_date, revenue, runtime, spoken_languages, status, tagline, title, vote_average, vote_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)";
const removeMovie = "DELETE FROM movies WHERE id = $1";



module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    removeMovie,
  };
  
