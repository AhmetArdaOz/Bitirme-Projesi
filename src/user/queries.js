const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id =$1";
const checkEmailExists = "SELECT u FROM users u WHERE u.email = $1";
const addUser =
  "INSERT INTO users (name, surname, email, password, isvisited) VALUES ($1, $2, $3, $4, false)";
const removeUser = "DELETE FROM users WHERE id = $1";
const updateUser =
  "UPDATE users SET name = $1, surname = $2, email = $3 WHERE id = $4";
const updateIsVisited = "UPDATE users SET isvisited = true WHERE id = $1";

module.exports = {
  getUsers,
  getUserById,
  checkEmailExists,
  addUser,
  removeUser,
  updateUser,
  updateIsVisited,
};
