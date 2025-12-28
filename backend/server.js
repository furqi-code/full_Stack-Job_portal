require('dotenv/config'); 
const express = require("express");
const app = express();
const PORT = parseInt(process.env.PORT) || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 500 });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
const jobListLimiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 200 });
const writeLimiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 100 });

// Local modules
const register = require("./router/register");
const login = require("./router/login");
const logout = require('./router/logout');
const forgot = require("./router/forgotPassword");
const isLoggedin = require("./router/auth-status");
const jobs = require("./router/joblist");
const job_seeker = require("./router/job-seeker");
const employer = require("./router/employer");

app.use(globalLimiter);
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
app.use('/register', authLimiter, register);
app.use('/login', authLimiter, login)
app.use('/logout', authLimiter, logout);
app.use("/forgotPassword", authLimiter, forgot);
app.use('/auth/status', isLoggedin)  // to set the state in JobContextProvider
app.use('/joblist', jobListLimiter, jobs);
// Protected routes
app.use('/account/job_seeker', writeLimiter, job_seeker);
app.use('/account/employer', writeLimiter, employer);


app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
