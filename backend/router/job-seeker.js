const express = require("express");
const router = express.Router();
const { executeQuery } = require("../mySqldb/Query");

router.get("/savedJob", async (req, res) => {
  try {
    const user_id = req.user_id;
    const savedJobs = await executeQuery(`select * from savedJobs where user_id = ?`, [user_id]);
    res.status(200).send({data: savedJobs});
  } catch (err) {
    console.log("Error fetching savedJobList", err);
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

router.post("/saveJob", async (req, res) => {
  try {
    const { user_id, user_type } = req; 
    if(user_type === 'job_seeker'){
        const { job_id } = req.query;
        if (!job_id) {
            return res.status(400).send({ message: "Job ID is required" });
        }
        const [existing] = await executeQuery(
            `SELECT * FROM savedJobs WHERE job_id = ? AND user_id = ?`,
            [job_id, user_id]
        );
        if (existing){
            return res.status(409).send({message: `This Job is already saved`});
        }
        
        const inserted_item = await executeQuery(
            `INSERT INTO savedJobs(user_id, job_id) VALUES (?, ?)`,
            [user_id, job_id]
        );
        return res.status(200).send({ message: "Job saved successfully" });
    }else{
        return res.status(409).send({message: `This user isn't a job seeker`});
    }
  } catch (err) {
    console.log("Error saving jobs", err);
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

module.exports = router