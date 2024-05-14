const pool = require("../../db");
const queries = require("./queries");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addUser = (req, res) => {
  const { name, surname, email, password } = req.body;

  // Check if the password field exists in the request body
  if (!password) {
    return res.status(400).send("Password is required.");
  }

  // check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists.");
    } else {
      //add user to db
      pool.query(
        queries.addUser,
        [name, surname, email, password],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("User created Successfully!");
        }
      );
    }
  });
};

const removeUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) {
      // Handle query execution error
      res.status(500).send("Error removing user.");
      return;
    }

    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send("User does not exist.");
    }

    pool.query(queries.removeUser, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("User removed successfully!");
    });
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, surname, email } = req.body;
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send("User does not exist.");
    }

    pool.query(
      queries.updateUser,
      [name, surname, email, id],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("User updated successfully");
      }
    );
  });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  removeUser,
  updateUser,
};
