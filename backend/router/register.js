const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const SALTROUND = parseInt(process.env.SALTROUND) || 10;
const { executeQuery } = require("../mySqldb/Query");

Router.post("/", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(409).send("Incomplete credentials");
    }
    const existingUser = await executeQuery(
      `SELECT * FROM users WHERE email = ? OR username = ?`,
      [email, username]
    );
    if (existingUser.length > 0)
      return res.status(409).send("User already exists with this Email / username");

    const hashedPassword = await bcrypt.hash(password, SALTROUND);
    const insertedUser = await executeQuery(
      `INSERT INTO users(username, email, password, role) VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, role]
    );

    if (insertedUser.insertId > 0) {
      return res.status(200).send("Registration/signup successful");
    } else {
      return res.status(500).send("Error inserting user in DB");
    }
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

module.exports = Router;
