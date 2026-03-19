# Authentication — Backend

## Overview

CourseHub uses JWT-based authentication. Users sign up with a role (`instructor` or `learner`), log in with username and password, and receive a token to access protected routes.

## File Structure

```
backend/src/
├── controllers/
│   ├── authController.ts    — signup and login logic
│   └── userController.ts    — get user info, update user
├── models/
│   └── users.ts             — User model (Sequelize)
├── index.ts                 — Sequelize instance, DB connection
├── routes.ts                — mounts all API routes
├── app.ts                   — Express app setup
└── server.ts                — entry point, starts server
```

## Auth Flow

```
1. User signs up → password hashed with bcrypt → user saved to DB → JWT returned
2. User logs in  → password compared with bcrypt → JWT returned
3. User sends requests with JWT → middleware verifies token → route handler executes
```

## API Endpoints

### `/api/auth/signup`

### `/api/auth/login`

## JWT

Add later

## Roles

| Role | Value | Description |
|------|-------|-------------|
| Learner | `learner` | Browse courses, register for enrollment |
| Instructor | `instructor` | Create and manage courses, approve enrollments |

Role is set at signup and cannot be changed.

