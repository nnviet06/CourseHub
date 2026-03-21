# CourseHub Backend Guide

This document covers setting up the database, running migrations, and working with the backend.

## Prerequisites

- **Node.js** v18+
- **Docker** & **Docker Compose**

---

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create Environment File

Create a `.env` file in `backend/`:

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
DB_USER=coursehub_user
DB_PASSWORD=your_secure_password_here
```

> Never commit `.env` to version control.

### 3. Start the Database

```bash
docker compose up -d
```

### 4. Run Migrations

```bash
npx sequelize-cli db:migrate
```

This creates the database tables. Anyone cloning the repo should run this after starting the container.

### 5. Start the Backend

```bash
npm run dev
```

You should see:
```
connected successfully
Server running on port 5000
```

---

## Database Workflow

### Check Container Status
```bash
docker ps
```
You should see `postgres_db` running.

### View Database Logs
```bash
docker logs -f postgres_db
```

### Open psql in the Container
```bash
docker exec -it postgres_db psql -U <DB_USER> -d course_hub
```

Useful psql commands:
```sql
\dt                  -- list all tables
SELECT * FROM users; -- query users table
\q                   -- exit psql
```

### Stop the Database
```bash
docker compose down
```

### Stop and Remove Database Volume
```bash
docker compose down -v
```

> Only use this when you want a completely clean database state. This deletes all data.

---

## Migrations

Migrations are version-controlled schema changes. They live in `src/migrations/`.

### Run all pending migrations
```bash
npx sequelize-cli db:migrate
```

### Roll back the last migration
```bash
npx sequelize-cli db:migrate:undo
```

### Generate a new migration
```bash
npx sequelize-cli migration:generate --name <migration-name>
```

---

## Health Check

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Directory Structure

```
backend/
├── src/
│   ├── index.ts                  # Entry point — connects to DB then starts the server
│   ├── app.ts                    # Express setup — middleware, routes, error handlers
│   ├── database.ts               # Sequelize instance and database connection logic
│   ├── controllers/              # Request handlers — business logic for each route
│   │   ├── authController.ts     # Handles login and signup
│   │   └── userController.ts     # Handles user-related operations
│   ├── models/                   # Sequelize model definitions
│   │   └── users.ts              # User model (id, username, passwordHash, role)
│   ├── routes/                   # Express routers — wire URLs to controllers
│   │   ├── authRouter.ts         # POST /api/auth/login, /api/auth/signup
│   │   └── userRouter.ts         # GET /api/users/
│   ├── migrations/               # Database migrations — run with sequelize-cli
│   └── config/
│       ├── database.ts           # Sequelize connection config (used by the app)
│       └── database.js           # Sequelize CLI config (used by migrations)
├── docs/
│   ├── AUTH.md
│   └── BUILD_PLAN.md
├── docker-compose.yml            # PostgreSQL container definition
├── .sequelizerc                  # Tells sequelize-cli where to find migrations and config
├── package.json
├── tsconfig.json
└── .env                          # Environment variables (create this, never commit)
```

---

## Available Scripts

| Command                              | Description                        |
| ------------------------------------ | ---------------------------------- |
| `npm run dev`                        | Start dev server with hot reload   |
| `npm run build`                      | Compile TypeScript to JavaScript   |
| `npm start`                          | Start production server            |
| `npx sequelize-cli db:migrate`       | Run pending migrations             |
| `npx sequelize-cli db:migrate:undo`  | Roll back last migration           |

---

## Troubleshooting

### "connect ECONNREFUSED"
The server can't reach the database.
- [ ] Is the container running? `docker ps`
- [ ] Are your `.env` credentials correct?
- [ ] Did you run `docker compose up -d`?

### No tables found in psql
- [ ] Did you run `npx sequelize-cli db:migrate`?
- [ ] Are you connected to the right database (`course_hub`)?

### Permission denied connecting to Docker
Add your user to the docker group:
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Port 5432 already in use (Windows)
Check what's using it:
```powershell
Get-NetTCPConnection -LocalPort 5432 -State Listen
```
Either stop the conflicting service or remap the port in `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"
```

