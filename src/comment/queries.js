const getCommentsByMovieId = "SELECT * FROM comments WHERE movie_id = $1";
const addComment =
  "INSERT INTO comments (user_id, movie_id, comment, vote, username) VALUES ($1, $2, $3, $4, $5)";

module.exports = {
  getCommentsByMovieId,
  addComment,
};
