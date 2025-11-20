const express = require("express");
const router = express.Router();
const { executeQuery } = require("../mySqldb/Query");

router.get("/", async (req, res) => {
  try {
    const { filterBy, filterType } = req.query;   // when you select Filter
    console.log("filterBy - ", filterBy);
    console.log("filterType - ", filterType);
    let jobs;
    if (filterBy && filterType) {
      if (filterType === "Location") {
        jobs = await executeQuery(`select * from jobs where location = ?`, [filterBy]);
      } else if (filterType === "Role") {
        jobs = await executeQuery(`select * from jobs where title = ?`, [filterBy]);
      } else if (filterType === "Salary") {
        if(filterBy === '4L to 6L'){
          jobs = await executeQuery(`select * from jobs where salary = ?`, [filterBy]);
        }
        else if(filterBy === '7L to 11L'){
          jobs = await executeQuery(`select * from jobs where salary = ?`, [filterBy]);
        }
        else if(filterBy === '12L to 15L'){
          jobs = await executeQuery(`select * from jobs where salary = ?`, [filterBy]);
        }
        else if(filterBy === '16L to 22L'){
          jobs = await executeQuery(`select * from jobs where salary = ?`, [filterBy]);
        }
      }
    } else {
      jobs = await executeQuery(`SELECT * FROM jobs`);
    }
    if (jobs.length === 0) {
      return res.status(200).send({ data: [] });
    }
    res.status(200).send({ data: jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

module.exports = router;
