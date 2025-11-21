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
    const payload = jwt.verify(token, SECRET);
    req.user_type = payload.user_type;
    return res.json({ isLoggedin: true, user_type: req.user_type });
  } catch {
    return res.json({ isLoggedin: false });
  }
});

module.exports = Router;
