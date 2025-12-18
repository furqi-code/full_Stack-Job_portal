const express = require("express");
const router = express.Router();
const { executeQuery } = require("../mySqldb/Query");
const { Auth } = require("../Authmiddleware");
const { fileUpload } = require("../multerMiddleware");

router.use(Auth);

router.get("/profile", async (req, res) => {
  try {
    const user_id = req.user_id;
    const [dbUser] = await executeQuery(
      `SELECT * FROM profiles WHERE user_id = ?`,
      [user_id]
    );
    const [dbUserCreated_at] = await executeQuery(
      `SELECT created_at FROM users WHERE id = ?`,
      [user_id]
    );
    res.status(200).send({
      info: dbUser,
      joined: dbUserCreated_at
    });
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
