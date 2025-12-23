const express = require("express");
const router = express.Router();
const { executeQuery } = require("../mySqldb/Query");
const { Auth } = require("../Authmiddleware");
const { fileUpload } = require("../multerMiddleware");
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || "http://localhost:1111"; // req to get companyLogo accessible in frontend folder to use in img src=''

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
      joined: dbUserCreated_at,
    });
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

router.patch("/profile", fileUpload.single("profile_pic"), async (req, res) => {
  try {
    const user_id = req.user_id;
    let profile_pic;
    const { name, phone, address, gender } = req.body;
    console.log("body\n", req.body, "\nfile obj", req.file);
    if (!name || !gender) {
      return res.status(400).send({ message: "Name and gender are required" });
    }
    const [dbUser] = await executeQuery(`SELECT * FROM users WHERE id = ?`, [
      user_id,
    ]);
    if (!dbUser) {
      return res.status(401).send({ message: "User not found" });
    }

    if (!req.file) {
      const [existingProfilePic] = await executeQuery(
        `SELECT profile_pic FROM profiles WHERE user_id = ?`,
        [user_id]
      );
      profile_pic = existingProfilePic ? existingProfilePic.profile_pic : null;
    } else {
      profile_pic = `${SERVER_BASE_URL}/uploads/profile_pics/${req.file.filename}`;
    }
    const result = await executeQuery(
      `UPDATE profiles 
      SET name = ?, phone = ?, address = ?, gender = ?, profile_pic = ?
      WHERE user_id = ?`,
      [name, phone, address, gender, profile_pic, user_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Profile not found" });
    }
    res.status(200).send({
      message: "User profile updated successfully",
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.get("/myJobs", async (req, res) => {
  try {
    const { user_id } = req;
    if (!user_id) {
      return res.status(400).send({ message: "user_id parameter is required" });
    }
    const postedJobs = await executeQuery(
      `SELECT * FROM jobs WHERE employer_id = ?`,
      [user_id]
    );
    if (postedJobs.length === 0) {
      return res.status(404).send({ data: [] });
    }
    res.status(200).send({ data: postedJobs });
  } catch (err) {
    console.error("Error fetching your posted Jobs: ", err);
    res.status(500).send({
      message: err.message || "Something went wrong",
    });
  }
});

router.post("/addJob", fileUpload.single("companyLogo"), async (req, res) => {
  try {
    const { user_id } = req;
    const {
      title,
      description,
      company,
      type,
      work_mode,
      location,
      experience_min,
      experience_max,
      salary_min,
      salary_max,
    } = req.body;
    console.log("body\n", req.body, "\nfile obj", req.file);

    const logoPath = req.file
      ? `${SERVER_BASE_URL}/uploads/companyLogo/${req.file.filename}`
      : null;

    const insert_Job = await executeQuery(
      `INSERT INTO jobs (employer_id, title, description, company, type, work_mode, location,
       experience_min, experience_max, salary_min, salary_max, expires_at, companyLogo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        title,
        description,
        company,
        type,
        work_mode,
        location,
        experience_min,
        experience_max,
        salary_min,
        salary_max,
        null,
        logoPath,
      ]
    );

    if (insert_Job.insertId > 0) {
      return res.status(201).send({ message: "Job posted successfully" });
    } else {
      return res.status(400).send({ message: "Failed to create this job" });
    }
  } catch (err) {
    console.error("Job insert error:", err);
    res.status(500).send({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

// fetch all the job_seekers with the same job role to send an email
router.get("/user_job_role", async (req, res) => {
  try {
    const { user_id } = req;
    const { job_role } = req.query;

    const employer = await executeQuery(
      `select username, email from users where id = ?`,
      [user_id]
    );
    const candidates = await executeQuery(
      `select p.name, p.phone, u.email
       from profiles p
       inner join users u on p.user_id = u.id
       where job_role = ?
       ORDER BY u.created_at DESC`,
      [job_role]
    );
    
    if (candidates.length > 0)
      res.status(200).send({
        data: candidates,
        employer_email: employer[0].email,
        employer_name: employer[0].username,
      });
    else
      res.status(200).send({
        data: [],
        employer_email: employer[0].email,
        employer_name: employer[0].username,
      });
  } catch (err) {
    res.status(500).send({ message: err.message || "Something went wrong" });
  }
});

router.get("/applications", async (req, res) => {
  try {
    const { user_id } = req;
    // you can get job__seeker's id from users, profile, or applications table
    const rows = await executeQuery(
      `SELECT a.resume_url, a.applied_at, a.job_id, a.candidate_id, 
        j.title AS job_title, j.company, j.location, j.work_mode,
        p.name, p.phone, p.profile_pic,
        u.email 
       FROM applications a
       INNER JOIN jobs j ON a.job_id = j.id
       INNER JOIN profiles p ON a.candidate_id = p.user_id
       INNER JOIN users u ON a.candidate_id = u.id
       WHERE j.employer_id = ? AND a.status = ?
       ORDER BY a.applied_at DESC`,
      [user_id, "pending"]
    );

    res.status(200).send({ data: rows });
  } catch (err) {
    res.status(500).send({ message: err.message || "Something went wrong" });
  }
});

router.patch("/selection", async (req, res) => {
  try {
    const { user_id } = req;
    const { candidate_status, candidate_id, job_id } = req.query;
    await executeQuery(
      `update applications set status = ?, updated_by = ? where candidate_id = ? AND job_id = ?`,
      [candidate_status, user_id, candidate_id, job_id]
    );
    res.status(200).send({ message: "Candidate selection done" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Something went wrong" });
  }
});

module.exports = router;
