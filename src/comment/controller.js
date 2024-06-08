const pool = require("../../db");
const queries = require("./queries");

const getCommentsByMovieId = (req, res) => {
  const movie_id = parseInt(req.params.movie_id);
  pool.query(queries.getCommentsByMovieId, [movie_id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addComment = (req, res) => {
  const { user_id, movie_id, comment, vote, username } = req.body;
  const voteFloat = parseFloat(vote);
  pool.query(
    queries.addComment,
    [user_id, movie_id, comment, voteFloat, username],
    (error, results) => {
      if (error) throw error;
      res.status(201).json({ message: "Comment added successfully!" });
    }
  );
};

module.exports = {
  getCommentsByMovieId,
  addComment,
};
