const express = require("express");
const Router = express.Router();
const { executeQuery } = require("../mySqldb/Query");

Router.post("/", async (req, res) => {
  res.clearCookie('token');
  res.status(200).send({
    message: "Logout successfull",
  });
});

module.exports = Router;
