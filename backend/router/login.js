const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { executeQuery } = require("../mySqldb/Query");

Router.post("/", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(409).send("Provide necessary details");
    }
    const [dbUser] = await executeQuery(`SELECT * FROM users WHERE email = ?`, [email]);
    if (!dbUser) {
      return res.status(401).send("Invalid Email");
    }

    const hashpwrd = dbUser.password;
    const passwordMatch = await bcrypt.compare(password, hashpwrd);
    if (!passwordMatch) {
      return res.status(401).send("Invalid Password");
    }

    const token = jwt.sign(
      {
        email: dbUser.email,
        user_type: dbUser.role,
        user_id: dbUser.id,
      },
      SECRET,
      // { expiresIn: "1h" } 
    );

    res.cookie("token", token, { httpOnly: true }) ;
    return res.status(200).send({
      message: "User logged in",
    });

  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

module.exports = Router;
