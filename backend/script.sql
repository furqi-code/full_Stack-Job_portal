-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('seeker', 'employer', 'admin') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Profiles table
CREATE TABLE profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  about TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Skills table
CREATE TABLE skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- User_Skills table
CREATE TABLE user_skills (
  user_id INT NOT NULL,
  skill_id INT NOT NULL,
  PRIMARY KEY (user_id, skill_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (skill_id) REFERENCES skills(id)
);

-- Jobs table
CREATE TABLE jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employer_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type ENUM('full-time', 'part-time', 'contract', 'remote') NOT NULL,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  salary_min DECIMAL(10, 2),
  salary_max DECIMAL(10, 2),
  salary_currency CHAR(3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  FOREIGN KEY (employer_id) REFERENCES users(id)
);

-- Applications table
CREATE TABLE applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_id INT NOT NULL,
  user_id INT NOT NULL,
  resume_url VARCHAR(255) NOT NULL,
  status ENUM('pending', 'reviewing', 'shortlisted', 'rejected') NOT NULL,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);