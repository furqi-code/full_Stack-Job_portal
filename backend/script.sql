create database job_board;
use job_board;

-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('job_seeker', 'employer', 'admin') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Profiles table
CREATE TABLE profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),	
  address TEXT,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  job_role VARCHAR(255),
  total_experience  INT,
  about TEXT,
  profile_pic TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
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
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- Jobs table
CREATE TABLE jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employer_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  company VARCHAR(255) NOT NULL,
  type ENUM('Full-time', 'Part-time', 'Contract') NOT NULL,
  work_mode ENUM('On-site', 'Remote', 'Hybrid') NOT NULL,
  location TEXT,
  experience_min INT,
  experience_max INT,
  salary_min INT,
  salary_max INT,
  companyLogo TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  FOREIGN KEY (employer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Applications table
CREATE TABLE applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  job_id INT NOT NULL,
  resume_url VARCHAR(255) NOT NULL,
  status ENUM('pending', 'shortlisted', 'rejected') NOT NULL,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  re_applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Saved table
CREATE TABLE savedJobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  job_id INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO jobs (
  employer_id, title, description, company, type, work_mode, location,
  experience_min, experience_max, salary_min, salary_max, companyLogo, created_at, expires_at
) VALUES
(1, 'FullStack Developer', 'FullStack Developer role based in Delhi NCR with salary range 12L to 15L.', 'Flipkart', 'Full-time', 'Hybrid', 'Delhi NCR', 0, 5, 12, 15, 'https://logo.clearbit.com/flipkart.com', CURRENT_TIMESTAMP, NULL),
(1, 'Frontend Developer', 'Frontend Developer role based in Bangalore with salary range 4L to 6L.', 'Facebook', 'Part-time', 'Remote', 'Bangalore', 0, 5, 4, 6, 'https://logo.clearbit.com/facebook.com', CURRENT_TIMESTAMP, NULL),
(1, 'Backend Developer', 'Backend Developer role based in Hyderabad with salary range 4L to 6L.', 'Uber', 'Contract', 'On-site', 'Hyderabad', 0, 5, 4, 6, 'https://logo.clearbit.com/uber.com', CURRENT_TIMESTAMP, NULL),
(1, 'Network Engineer', 'Network Engineer role based in Kolkata with salary range 7L to 11L.', 'Google', 'Full-time', 'On-site', 'Kolkata', 0, 5, 7, 11, 'https://logo.clearbit.com/google.com', CURRENT_TIMESTAMP, NULL),
(1, 'UX Researcher', 'UX Researcher role based in Amsterdam with salary range €55K to €75K.', 'Booking.com', 'Full-time', 'Remote', 'Amsterdam', 2, 6, 55, 75, 'https://logo.clearbit.com/booking.com', CURRENT_TIMESTAMP, NULL),
(1, 'Sales Executive', 'Sales Executive role based in Delhi NCR with salary range 12L to 15L.', 'Flipkart', 'Full-time', 'Remote', 'Delhi NCR', 0, 5, 12, 15, 'https://logo.clearbit.com/flipkart.com', CURRENT_TIMESTAMP, NULL),
(1, 'Data Analyst', 'Data Analyst role based in Bangalore with salary range 7L to 11L.', 'Accenture', 'Part-time', 'On-site', 'Bangalore', 0, 5, 7, 11, 'https://logo.clearbit.com/accenture.com', CURRENT_TIMESTAMP, NULL),
(1, 'UX Designer', 'UX Designer role based in Kashmir with salary range 12L to 15L.', 'Wipro', 'Contract', 'Hybrid', 'Kashmir', 0, 5, 12, 15, 'https://logo.clearbit.com/wipro.com', CURRENT_TIMESTAMP, NULL),
(1, 'Product Manager', 'Product Manager role based in Hyderabad with salary range 16L to 22L.', 'Adobe', 'Full-time', 'Remote', 'Hyderabad', 0, 5, 16, 22, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ptlo3aGM1csGULAvNxzL2jeC-ibonON0cigmkce2BVwh8WA9dQddaqMJ5Od3ezAyNHU&usqp=CAU', CURRENT_TIMESTAMP, NULL),
(1, 'Marketing Specialist', 'Marketing Specialist role based in Shanghai with salary range 7L to 11L.', 'Salesforce', 'Part-time', 'On-site', 'Shanghai', 0, 5, 7, 11, 'https://logo.clearbit.com/salesforce.com', CURRENT_TIMESTAMP, NULL),
(1, 'HR Manager', 'HR Manager role based in Shenzhen with salary range 12L to 15L.', 'IBM', 'Contract', 'Hybrid', 'Shenzhen', 0, 5, 12, 15, 'https://crystalpng.com/wp-content/uploads/2025/05/ibm-logo.png', CURRENT_TIMESTAMP, NULL),
(1, 'Cloud Engineer', 'Cloud Engineer role based in San Francisco with salary range $120K to $150K.', 'Google', 'Full-time', 'Remote', 'San Francisco', 2, 7, 120, 150, 'https://logo.clearbit.com/google.com', CURRENT_TIMESTAMP, NULL),
(1, 'Data Scientist', 'Data Scientist role based in London with salary range £60K to £90K.', 'Microsoft', 'Contract', 'Hybrid', 'London', 3, 8, 60, 90, 'https://logo.clearbit.com/microsoft.com', CURRENT_TIMESTAMP, NULL),
(1, 'Project Coordinator', 'Project Coordinator role based in Paris with salary range €45K to €65K.', 'Capgemini', 'Contract', 'Hybrid', 'Paris', 1, 5, 45, 65, 'https://logo.clearbit.com/capgemini.com', CURRENT_TIMESTAMP, NULL),
(1, 'Mobile Developer', 'Mobile Developer role based in Berlin with salary range €50K to €70K.', 'Spotify', 'Part-time', 'Hybrid', 'Berlin', 1, 5, 50, 70, 'https://logo.clearbit.com/spotify.com', CURRENT_TIMESTAMP, NULL),
(1, 'Cybersecurity Specialist', 'Cybersecurity Specialist role based in Sydney with salary range AUD 90K to AUD 120K.', 'Cisco', 'Full-time', 'On-site', 'Sydney', 4, 9, 90, 120, 'https://logo.clearbit.com/cisco.com', CURRENT_TIMESTAMP, NULL),
(1, 'DevOps Engineer', 'DevOps Engineer role based in Mumbai with salary range 4L to 6L.', 'Amazon', 'Contract', 'Hybrid', 'Mumbai', 0, 5, 4, 6, 'https://logo.clearbit.com/amazon.com', CURRENT_TIMESTAMP, NULL),
(1, 'AI Researcher', 'AI Researcher role based in Toronto with salary range CAD 80K to CAD 110K.', 'OpenAI', 'Full-time', 'Remote', 'Toronto', 3, 8, 80, 110, 'https://logo.clearbit.com/openai.com', CURRENT_TIMESTAMP, NULL),
(1, 'Technical Writer', 'Technical Writer role based in Vancouver with salary range CAD 60K to CAD 85K.', 'Red Hat', 'Part-time', 'Remote', 'Vancouver', 1, 6, 60, 85, 'https://logo.clearbit.com/redhat.com', CURRENT_TIMESTAMP, NULL);


select * from users;	
select * from profiles;
select * from skills;
select * from user_skills;
select * from jobs;
select * from savedJobs;
select * from applications;


drop table users;
drop table jobs;
drop table savedJobs;
drop table applications;


drop database job_board;