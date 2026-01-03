# Job Portal Application

A full-stack Job Portal web application that allows users to register, authenticate, and manage job-related data. Built using Node.js, Express, and MySQL with a separate frontend.

## Features

- User authentication using JWT
- Secure password hashing with bcrypt
- Role-based access (Admin / User)
- Job posting and management
- File upload support using Multer
- RESTful API architecture
- MySQL database integration

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- JWT (JSON Web Token)
- Bcrypt
- Multer

### Frontend
- HTML
- CSS
- JavaScript

## Project Structure


## Environment Variables

Create a `.env` file inside the `backend` directory and add the following:


## Installation & Setup

### 1. Clone the Repository

### 2. Backend Setup

### 3. Frontend Setup

## API Endpoints (Sample)

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /register | User registration |
| POST | /login | User login |
| GET | /jobs | Get all jobs |
| POST | /jobs | Create job (Admin only) |

## Security

- Passwords are encrypted using bcrypt
- JWT-based authentication
- Protected routes using middleware

## Future Improvements

- Job search and filters
- Resume upload & download
- Admin dashboard
- Pagination and sorting
- Deployment

## Author

**Md Furqan Ahmad**  
Industrial Management Student  
Full-Stack Developer
