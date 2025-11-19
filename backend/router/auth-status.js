const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

Router.get("/", (req, res) => {
  console.log("auth-status chl rha h");
  const token = req.cookies.token;
  if (!token) {
    return res.json({ isLoggedin: false });
  }
  try {
    jwt.verify(token, SECRET);
    return res.json({ isLoggedin: true });
  } catch {
    return res.json({ isLoggedin: false });
  }
});

module.exports = Router;
