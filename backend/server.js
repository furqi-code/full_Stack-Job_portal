require('dotenv/config'); 
const express = require("express");
const app = express();
const PORT = parseInt(process.env.PORT) || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Local modules
const register = require("./router/register");
const login = require("./router/login");
const logout = require('./router/logout');
const forgot = require("./router/forgotPassword");
const isLoggedin = require("./router/auth-status");
const jobs = require("./router/joblist");
const job_seeker = require("./router/job-seeker");

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
  
// Public routes 
app.use('/register', register);
app.use('/login', login)
app.use('/logout', logout);
app.use("/forgotPassword", forgot);
app.use('/auth/status', isLoggedin)  // to set the state in JobContextProvider
app.use('/joblist', jobs);
// Protected routes
app.use('/account/job_seeker', job_seeker);


app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
