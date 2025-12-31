const express = require("express");
const router = express.Router();
const { executeQuery } = require("../mySqldb/Query");

router.get("/", async (req, res) => {
  try {
    const { filterBy, filterType, mode, limit, skip } = req.query; 
    const pageLimit = Number(limit) || 5;  
    const pageSkip = Number(skip) || 0;
    let jobs, total=0;
    
    // Homepage: some recent jobs (no filters/pagination)
    if (mode === 'homepage') {
      jobs = await executeQuery(`select * from jobs`);
    }
    // Job page: when clicked on filter
    else if (filterBy && filterType) { 
      switch (filterType) {
        case "Location":
          jobs = await executeQuery(`select * from jobs where location = ?`, [filterBy]);
          break;

        case "Role":
          jobs = await executeQuery(`select * from jobs where title = ?`, [filterBy]);
          break;

        case "Salary":
          if (filterBy === '4L to 6L') { 
            jobs = await executeQuery(`select * from jobs where salary_max >= 4 AND salary_min <= 6`);
          } else if (filterBy === '7L to 11L') {
            jobs = await executeQuery(`select * from jobs where salary_max >= 7 AND salary_min <= 11`);
          } else if (filterBy === '12L to 15L') {
            jobs = await executeQuery(`select * from jobs where salary_max >= 12 AND salary_min <= 15`);
          } else if (filterBy === '16L to 45L') {
            jobs = await executeQuery(`select * from jobs where salary_max >= 16 AND salary_min <= 45`);
          } else if (filterBy === '45LPA +') {
            jobs = await executeQuery(`select * from jobs where salary_min >= 45`);
          }
          break;

        default:
          return res.status(400).send({ message: "Invalid filterType" });
      }
    } else {
      jobs = await executeQuery(`SELECT * FROM jobs LIMIT ? OFFSET ?`, [pageLimit, pageSkip]); 
      total = (await executeQuery("select count(*) as cnt from jobs"))[0].cnt;
    }

    if (jobs.length === 0) {
      return res.status(200).send({ data: [], total });
    }
    res.status(200).send({ data: jobs, total });
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

router.get("/applicants", async (req, res) => {
  try {
    const { job_id } = req.query;
    if (!job_id) {
      return res.status(400).send({ message: "job_id query parameter is required" });
    }
    const totalApplicants = await executeQuery(`SELECT candidate_id FROM applications WHERE job_id = ? AND status = ?`,
      [job_id, 'pending']);
    if (totalApplicants.length === 0) {
      return res.status(404).send({ data: [] });
    }
    res.status(200).send({ data: totalApplicants });
  } catch (err) {
    console.error("Error fetching applicants for this particular job: ", err);
    res.status(500).send({
      message: err.message || "Something went wrong",
    });
  }
});

module.exports = router;
