const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gradproject",
  password: "rs68fkq54",
  port: 5432,
});

module.exports = pool;
