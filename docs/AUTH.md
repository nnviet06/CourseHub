# Authentication Backend Notes

## Overview

Authentication is fully implemented for signup and login.

- Password hashing with bcrypt during signup.
- JWT token issued on login, stored in httpOnly cookie.
- User role supports two values: instructor and learner.
- Token verification middleware not yet implemented.

## Current Backend Structure
```
backend/
├── src/
│   ├── app.ts                        # Express setup — middleware, routes, error handlers
│   ├── database.ts                   # Sequelize instance
│   ├── server.ts                     # Entry point — init model, connect DB, start server
│   ├── controllers/
│   │   ├── authController.ts         # Handles login and signup
│   │   └── userController.ts         # Handles user-related operations
│   ├── models/
│   │   └── users.ts                  # User model schema
│   ├── routes/
│   │   ├── authRouter.ts             # POST /api/auth/login, /api/auth/signup
│   │   └── userRouter.ts             # GET /api/users/, POST /api/users/
│   ├── migrations/
│   │   └── 20260321035205-create-users.js  # Creates users table
│   └── config/
│       └── database.js               # Sequelize CLI config (used by migrations)
├── docs/
│   ├── AUTH.md                       
│   └── BUILD_PLAN.md                 
├── docker-compose.yml                # PostgreSQL container definition
├── .sequelizerc                      # Tells sequelize-cli where to find migrations and config
├── .env.example                      # Template for environment variables
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript compiler config
└── .env                              # Environment variables (never commit)
```

## Auth Flow

### Signup
1. Client sends username, password, and role to POST /api/auth/signup.
2. Server validates input and checks for existing username.
3. Server hashes password with bcrypt (11 salt rounds).
4. Server stores user in the users table.
5. Server returns created user payload without passwordHash.

### Login
1. Client sends username and password to POST /api/auth/login.
2. Server validates input and looks up user by username.
3. Server compares password with stored hash using bcrypt.
4. Server issues JWT token with user id, username, and role.
5. Token is set as httpOnly cookie (secure in production, sameSite lax).
6. Server returns user payload without passwordHash.

Table: users

| Field         | Type                      | Constraints                  |
| ------------- | ------------------------- | ---------------------------- |
| id            | uuid                      | primary key, default UUIDV4  |
| username      | varchar(50)               | not null, unique             |
| password_hash | varchar(255)              | not null                     |
| role          | enum(instructor, learner) | not null                     |
| created_at    | timestamptz               | not null                     |
| updated_at    | timestamptz               | not null                     |

Notes:

- updated_at is currently disabled in the Sequelize User model.
- password hash is stored in DB but excluded from API response payloads.

## Implemented Endpoints

- POST /api/auth/signup
  - req: `{ username, password, role }`
  - res: `{ id, username, role, createdAt }`
  - Creates a user with hashed password.
  - Returns created user without passwordHash.

- POST /api/auth/login
  - req: `{ username, password }`
  - res: `{ id, username, role }` + sets httpOnly cookie with JWT
  - Authenticates user and issues JWT in httpOnly cookie.
  - Returns user without passwordHash.

- GET /api/users
  - req: nothing
  - res: `[{ id, username, role, createdAt }]`
  - Returns all users.
  - Excludes passwordHash from response.
  - Not protected (no auth required).

- POST /api/users
  - req: `{ username, password, role }`
  - res: `{ id, username, role, createdAt }`
  - Duplicate of signup — commented out pending removal or protection.

## Planned Auth Endpoints

Update later
