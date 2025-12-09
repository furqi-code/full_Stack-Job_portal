const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const SALTROUND = parseInt(process.env.SALTROUND) || 10;  
const { executeQuery } = require("../mySqldb/Query");

router.patch("/change-password", async (req, res) => {
  try {
    const user_id = req.user_id;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).send({ message: "Provide necessary details" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: "new/confirm Passwords do not match" });
    }
    const [user] = await executeQuery(`SELECT * FROM users WHERE id = ?`, [user_id]);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect current password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, SALTROUND);
    await executeQuery(`UPDATE users SET password = ? WHERE id = ?`, [
      hashedPassword,
      user_id,
    ]);
    return res.status(200).send({ message: "Password changed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

router.get("/savedJob", async (req, res) => {
  try {
    const { user_id, user_type } = req;
    if (user_type !== 'job_seeker') {
      // return res.status(403).send({ message: "Access denied, only job seekers can view saved jobs" });
      res.status(200).send({data: []});
    }
    const savedJobs = await executeQuery(
      `SELECT j.* FROM savedJobs AS s INNER JOIN jobs AS j 
      ON s.job_id = j.id
      WHERE s.user_id = ?`,
      [user_id]
    );

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
        return res.status(403).send({message: `This user isn't a job seeker`});
    }
  } catch (err) {
    console.log("Error saving jobs", err);
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

router.delete("/eliminateJob", async (req, res) => {
  try {
    const { user_id, user_type } = req;
    const job_id = req.query.job_id;
    if(user_type === 'job_seeker'){
      await executeQuery(
        `delete from savedJobs where user_id = ? AND job_id = ?`,
        [user_id, job_id]
      );
      res.status(200).send({ message: "This job post has been unsaved" });
    }else{
      return res.status(403).send({message: `This user isn't a job seeker`});
    }
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

module.exports = router