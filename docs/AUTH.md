# Authentication Backend Notes

## Overview

Current authentication logic is partially implemented.

- Password hashing is implemented during user creation.
- JWT login and token verification middleware are not implemented yet.
- User role supports two values: instructor and learner.

## Current Backend Structure

backend/
|- src/
| |- app.ts
| |- index.ts
| |- routes.ts
| |- server.ts
| |- controllers/
| | |- authController.ts
| | |- userController.ts
| |- models/
| |- users.ts
|- docs/
| |- AUTH.md
| |- BUILD_PLAN.md
|- docker-compose.yml
|- package.json
|- tsconfig.json

## Current Auth Related Flow

1. Client sends username, password, and role to POST /api/users.
2. Server hashes password with bcrypt.
3. Server stores password_hash in the users table.
4. Server returns created user payload without passwordHash.

## User Schema

Table: users

| Field         | Type                      | Constraints                 |
| ------------- | ------------------------- | --------------------------- |
| id            | uuid                      | primary key, default UUIDV4 |
| username      | varchar(50)               | not null, unique            |
| password_hash | varchar(255)              | not null                    |
| role          | enum(instructor, learner) | not null                    |
| created_at    | timestamptz               | not null                    |

Notes:

- updated_at is currently disabled in the Sequelize User model.
- password hash is stored in DB but excluded from API response payloads.

## Implemented Endpoints

- GET /api/users
  - Returns all users.
  - Excludes passwordHash from response.

- POST /api/users
  - Creates a user with hashed password.
  - Returns created user without passwordHash.

## Planned Auth Endpoints

- POST /api/auth/signup
- POST /api/auth/login

authController.ts exists, but handlers are currently placeholders.

## JWT Status

JWT package is installed, but token issue and token verification flow are not wired yet.

## Roles

| Role       | Value      | Description                  |
| ---------- | ---------- | ---------------------------- |
| Learner    | learner    | Browse and enroll in courses |
| Instructor | instructor | Create and manage courses    |
