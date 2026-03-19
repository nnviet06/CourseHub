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

## User Schema 

- Role: enum('instructor', 'learner') 

| Field | Type | Constraints |
| --- | --- | --- | 
| id | uuid | default gen_random_uuid() not null |
| username | string(50) | not null and <> '' |
| email | string | not null and <> '' |
| passwordHash | string(255) | not null and <> '' |
| role | Role | not null |
| created_at | timestamptz | default now() and not null | 

## API Endpoints

### `/api/auth/signup` -> **void** 

### `/api/auth/login` -> **void** 

## JWT

Add later

## Roles

| Role | Value | Description |
|------|-------|-------------|
| Learner | `learner` | Browse courses, register for enrollment |
| Instructor | `instructor` | Create and manage courses, approve enrollments |

Role is set at signup and cannot be changed.

