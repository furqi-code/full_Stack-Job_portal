require('dotenv/config'); 
const express = require("express");
const app = express();
const PORT = parseInt(process.env.PORT) || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Auth } = require("./Authmiddleware");

// Local modules
const register = require("./router/register");
const login = require("./router/login");
const logout = require('./router/logout');
const forgot = require("./router/forgotPassword");
const isLoggedin = require("./router/auth-status");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(Auth);
  
app.use('/register', register);
app.use('/login', login)
app.use('/logout', logout);
app.use("/forgotPassword", forgot);
app.use('/auth/status', isLoggedin)  // to set the state in JobContextProvider


app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
