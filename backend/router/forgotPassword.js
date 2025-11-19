const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const SALTROUND = parseInt(process.env.SALTROUND) || 10;
const { executeQuery } = require("../mySqldb/Query");

Router.patch("/", async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).send({ message: "Provide necessary details" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    const [existing_user] = await executeQuery(
      `SELECT * FROM users WHERE Email = ?`,
      [email]
    );
    if (!existing_user) {
      return res.status(404).send({ message: "Email/user not found in DB" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALTROUND);
    const update_pass = await executeQuery(
      `UPDATE users SET Password = ? WHERE id = ?`,
      [hashedPassword, existing_user.id]
    );
    return res.status(200).send({ message: "Reset password successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

module.exports = Router;
