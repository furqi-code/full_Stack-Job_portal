require('dotenv/config'); 
const express = require("express");
const app = express();
const PORT = parseInt(process.env.PORT) || 3000;
const cors = require("cors");
const { Auth } = require("./Authmiddleware");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
// app.use(Auth);


app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
