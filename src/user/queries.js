const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id =$1";

module.exports = {
  getUsers,
  getUserById,
};
