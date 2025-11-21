const express = require("express");
const router = express.Router();
const { executeQuery } = require("../mySqldb/Query");

router.get("/", async (req, res) => {
  try {
    let { filterBy, filterType } = req.query;   // when you select Filter
    let jobs;

    if (filterBy && filterType) {
      switch (filterType) {
        case "Location":
          jobs = await executeQuery(`select * from jobs where location = ?`, [filterBy]);
          break;

        case "Role":
          jobs = await executeQuery(`select * from jobs where title = ?`, [filterBy]);
          break;

        case "Salary":
          if (filterBy === '4L to 6L') {  // comparing the opposite cols but still getting slightly correct results
            jobs = await executeQuery(`select * from jobs where salary_min >= 4 AND salary_max <= 6`);
          } else if (filterBy === '7L to 11L') {
            jobs = await executeQuery(`select * from jobs where salary_min >= 7 AND salary_max <= 11`);
          } else if (filterBy === '12L to 15L') {
            jobs = await executeQuery(`select * from jobs where salary_min >= 12 AND salary_max <= 15`);
          } else if (filterBy === '16L to 45L') {
            jobs = await executeQuery(`select * from jobs where salary_min >= 16 AND salary_max <= 45`);
          } else if (filterBy === '45LPA +') {
            jobs = await executeQuery(`select * from jobs where salary_min >= 45`);
          }
          break;

        default:
          return res.status(400).send({ message: "Invalid filterType" });
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
    return res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});


// Fetch one Job by id
router.get("/oneJob", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).send({ message: "id query parameter is required" });
    }
    const job = await executeQuery(`SELECT * FROM jobs WHERE id = ?`, [id]);
    if (job.length === 0) {
      return res.status(404).send({ message: "Job not found" });
    }
    res.status(200).send({ data: job[0] });
  } catch (err) {
    console.error("Error fetching job: ", err);
    res.status(500).send({
      message: err.message || "Something went wrong",
    });
  }
});

module.exports = router;
