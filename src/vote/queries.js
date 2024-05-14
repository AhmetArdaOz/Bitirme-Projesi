const getVotesByUserId = "SELECT * FROM votes WHERE user_id =$1";
const getVotes = "SELECT * FROM votes"
const addVote =
  "INSERT INTO votes (user_id, movie_id, vote) VALUES ($1, $2, $3)";
const getVoteById = "SELECT * FROM votes WHERE id =$1"
const removeVote = "DELETE FROM votes WHERE id = $1";
const updateUser =
  "UPDATE votes SET user_id = $1, movie_id = $2, vote = $3 WHERE id = $4";


module.exports = {
    getVotesByUserId,
    getVotes,
    addVote,
    getVoteById,
    removeVote,
    updateUser,
  };
  