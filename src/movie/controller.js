const pool = require("../../db");
const queries = require("./queries");

const getMovies = (req, res) => {
    pool.query(queries.getMovies, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  };

const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getMovieById, [id], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  };

  const addMovie = (req, res) => {
    const { budget, genres, homepage, keywords, original_language, original_title, overview, popularity, production_companies,
        production_countries, release_date, revenue, runtime, spoken_languages, status, tagline, title, vote_average, vote_count
     } = req.body;
         //add movie to db
        pool.query(
          queries.addMovie,
          [budget, genres, homepage, keywords, original_language, original_title, overview, popularity, production_companies,
            production_countries, release_date, revenue, runtime, spoken_languages, status, tagline, title, vote_average, vote_count],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Movie added Successfully!");
          }
        );
};

const removeMovie = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query(queries.getMovieById, [id], (error, results) => {
      if (error) {
        // Handle query execution error
        res.status(500).send("Error removing movie.");
        return;
      }
  
      const noMovieFound = !results.rows.length;
      if (noMovieFound) {
        res.send("Movie does not exist.");
      }
  
      pool.query(queries.removeMovie, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Movie removed successfully!");
      });
    });
  };

  module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    removeMovie,
  };