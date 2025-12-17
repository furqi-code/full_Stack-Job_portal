const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { executeQuery } = require("../mySqldb/Query");
const { fileUpload } = require('../multerMiddleware');
const SALTROUND = parseInt(process.env.SALTROUND) || 10;  
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:1111';  // req to get profile_pic in frontend folder to use in img src=''

router.get("/profile", async (req, res) => {
  try {
    const user_id = req.user_id;
    const [dbUser] = await executeQuery(
      `SELECT * FROM profiles WHERE user_id = ?`,
      [user_id]
    );
    res.status(200).send({
      info: dbUser,
    });
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

router.patch("/profile", fileUpload.single('profile_pic'), async (req, res) => {
  try {
    const user_id = req.user_id; 
    let profile_pic;  
    const { name, phone, address, gender, job_role, about } = req.body;
    console.log("body\n", req.body, "\nfile obj", req.file);
    if (!name || !gender) {
      return res.status(400).send({ message: "Name and gender are required" });
    }
    const [dbUser] = await executeQuery(`SELECT * FROM users WHERE id = ?`, [user_id]);
    if (!dbUser) {
      return res.status(401).send({ message: "User not found" });
    }
    
    if (!req.file) {
      const [existingProfilePic] = await executeQuery(`SELECT profile_pic FROM profiles WHERE user_id = ?`, [user_id]);
      profile_pic = existingProfilePic ? existingProfilePic.profile_pic : null;
    }else{
      profile_pic = `${SERVER_BASE_URL}/uploads/profile_pics/${req.file.filename}`; 
    }
    const result = await executeQuery(
      `UPDATE profiles 
      SET name = ?, phone = ?, address = ?, gender = ?, job_role = ?, about = ?, profile_pic = ?
      WHERE user_id = ?`,
      [name, phone, address, gender, job_role, about, profile_pic, user_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Profile not found" });
    }
    res.status(200).send({
      message: "User profile updated successfully",
      info: { name, phone, address, gender, job_role, about, profile_pic }
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).send({
      message: "Something went wrong",
      error: err.message
    });
  }
});

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
      return res.status(200).send({data: []});
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

router.post('/apply', fileUpload.single('resume'), async (req, res) => {
  try {
    const { user_id, user_type } = req;
    const job_id = req.query.job_id;
    if (!req.file) {
      return res.status(400).send({ message: "Resume file is required or invalid type" });
    }
    if (user_type !== 'job_seeker') {
      return res.status(403).send({ message: "This user isn't a job seeker" });
    }

    const alreadyApplied = await executeQuery(
      'SELECT id FROM applications WHERE user_id = ? AND job_id = ?',
      [user_id, job_id]);

    if (alreadyApplied.length > 0) {
      // Update resume & status
      const resume = `${SERVER_BASE_URL}/uploads/resumes_pdf/${req.file.filename}`;
      await executeQuery('UPDATE applications SET resume_url = ?, status = ? WHERE id = ?',
        [resume, 'pending', alreadyApplied[0].id]);
      return res.status(200).send({ message: "Application updated with new resume" });
      
      // OR reject duplicate 
      // return res.status(409).send({ message: "Application already exists for this job" });
    }

    const resume = `${SERVER_BASE_URL}/uploads/resumes_pdf/${req.file.filename}`;
    await executeQuery('INSERT INTO applications(user_id, job_id, resume_url, status) VALUES(?, ?, ?, ?)',
      [user_id, job_id, resume, 'pending']);
    res.status(201).send({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = router