const pool = require("../../db");
const queries = require("./queries");

const getVotes = (req, res) => {
  pool.query(queries.getVotes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getVoteById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getVoteById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getVotesByUserId = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getVotesByUserId, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addVote = async (req, res) => {
  const { votes } = req.body;
  console.log("Received votes:", votes);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const vote of votes) {
      const { user_id, movie_id, vote: userVote } = vote;
      console.log("Adding vote:", user_id, movie_id, userVote);
      await client.query(queries.addVote, [user_id, movie_id, userVote]);
    }
    await client.query("COMMIT");
    res.status(201).send("Votes added successfully!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error adding votes:", error);
    res.status(500).send("Error adding votes");
  } finally {
    client.release();
  }
};

const removeVote = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getVoteById, [id], (error, results) => {
    if (error) {
      // Handle query execution error
      res.status(500).send("Error removing vote.");
      return;
    }

    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send("Vote does not exist.");
    }

    pool.query(queries.removeVote, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Vote removed successfully!");
    });
  });
};

const updateVote = (req, res) => {
  const id = parseInt(req.params.id);
  const { user_id, movie_id, vote } = req.body;
  pool.query(queries.getVoteById, [id], (error, results) => {
    if (error) throw error;
    const noVoteFound = !results.rows.length;
    if (noVoteFound) {
      res.send("Vote does not exist.");
    }

    pool.query(
      queries.updateVote,
      [user_id, movie_id, vote, id],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Vote updated successfully");
      }
    );
  });
};

module.exports = {
  getVotesByUserId,
  getVotes,
  addVote,
  getVoteById,
  removeVote,
  updateVote,
};
