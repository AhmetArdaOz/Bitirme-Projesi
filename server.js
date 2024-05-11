const express = require("express");
const userRoutes = require("./src/user/routes");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const pool = require("./db");
const queries = require("./src/user/queries");
const cors = require("cors");

// Enable CORS for all origins
app.use(cors());

app.use(express.json());
SECRET_KEY = "262ggsdsh2436342rygryrwyw";
app.post("/api/v1/register", async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(queries.addUser, [
      name,
      surname,
      email,
      hashedPassword,
    ]);
    res.status(200).send("User created!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.post("/api/v1/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

function verifyToken(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }
  try {
    const decoded = jwt.verify(token, "262ggsdsh2436342rygryrwyw");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed: ", error.message);
    res.status(400).json({ message: "Invalid Token" });
  }
}

app.get("/api/v1/userinfo", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1/users", userRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
