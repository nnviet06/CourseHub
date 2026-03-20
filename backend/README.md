# CourseHub Backend Server & Database Guide

This guide explains how to set up and run the CourseHub backend server and PostgreSQL database.

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **Docker** & **Docker Compose** ([Download Docker Desktop](https://www.docker.com/products/docker-desktop))
  - _Alternative: You can use a local PostgreSQL installation instead of Docker_

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create Environment Configuration

Create a `.env` file in the `backend/` folder with the following variables:

```env
PORT=5000
FRONTEND_URL=http://localhost:5000
DB_USER=coursehub_user
DB_PASSWORD=your_secure_password_here
```

> **Important:** Replace `your_secure_password_here` with a strong password. Keep this file secure and never commit it to version control.

### 3. Start the Database (Docker)

```bash
docker-compose up -d
```

This command will:

- Pull the official PostgreSQL 17 Alpine image
- Create a PostgreSQL container named `postgres_db`
- Expose the database on `localhost:5432`
- Create a volume `db_data` for persistent storage

**Verify the database is running:**

```bash
docker ps
```

You should see the `postgres_db` container in the list.

### 4. Start the Backend Server

#### Development Mode (with hot reload)

```bash
npm run dev
```

The server will start on `http://localhost:5000` and automatically reload when you make changes to the code.

#### Production Mode

First, build the TypeScript:

```bash
npm run build
```

Then start the server:

```bash
npm start
```

## Available Scripts

| Command         | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `npm run dev`   | Start development server with hot reload (using ts-node-dev) |
| `npm run build` | Compile TypeScript to JavaScript                             |
| `npm start`     | Start production server                                      |
| `npm test`      | Run tests (currently not configured)                         |

## Database Information

- **Database Name:** `course_hub`
- **Default Port:** `5432`
- **Image:** PostgreSQL 17 Alpine (lightweight)
- **Storage:** Docker volume `db_data` (survives container restarts)

### Connecting to the Database

#### Using Docker Container

```bash
# Connect via docker
docker exec -it postgres_db psql -U coursehub_user -d course_hub
```

#### Using Tools

- **pgAdmin:** Web-based PostgreSQL management tool
- **DBeaver:** Desktop database IDE
- **VS Code Extensions:** PostgreSQL extension for code editor

Connection details for tools:

- Host: `localhost`
- Port: `5432`
- Username: `coursehub_user` (or value from `DB_USER` in .env)
- Password: (value from `DB_PASSWORD` in .env)
- Database: `course_hub`

## Server Health Check

Once the server is running, you can verify it's working:

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

## Stopping Services

### Stop the Backend Server

Press `Ctrl+C` in the terminal where the server is running.

### Stop the Database Container

```bash
docker-compose down
```

To also remove stored data:

```bash
docker-compose down -v
```

## Important Notes

### ⚠️ Windows PostgreSQL Port Conflict

If you're on Windows and have a local PostgreSQL service installed, it might be using port 5432, preventing Docker PostgreSQL from binding to that port.

**Check for port conflicts:**

```powershell
Get-NetTCPConnection -LocalPort 5432 -State Listen
```

**Solutions:**

1. **Stop the local PostgreSQL service** (if not needed):

   ```powershell
   Stop-Service -Name "postgresql-x64-17" -Force
   ```

2. **Use a different port** - Modify `docker-compose.yml`:
   ```yaml
   ports:
     - "5433:5432" # Use 5433 instead of 5432
   ```
   Then update your `.env`: `DATABASE_URL=postgresql://...@localhost:5433/coursehub`

### Frontend CORS Configuration

The backend accepts requests from `http://localhost:3000` by default. If your frontend runs on a different URL, update the `FRONTEND_URL` in your `.env` file.

### Database Initialization

The database schema should be created using your ORM (Sequelize is configured). Make sure to run any migration scripts before starting the server.

## Directory Structure

```
backend/
├── src/
│   ├── index.ts           # Database configuration
│   ├── server.ts          # Express app setup
│   ├── app.ts             # Main application logic
│   ├── controllers/       # API route handlers
│   │   ├── login.ts
│   │   └── user.ts
│   └── models/            # Database models
│       └── users.ts
├── dist/                  # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── docker-compose.yml     # Docker services configuration
└── .env                   # Environment variables (create this file)
```

## Troubleshooting

### "connect ECONNREFUSED" Error

The server can't connect to the database. Ensure:

- [ ] Docker PostgreSQL is running: `docker ps`
- [ ] Correct credentials in `.env` file
- [ ] Database port is not blocked (check Windows firewall)
- [ ] Check for port conflicts (see Port Conflict section)

### "command not found: docker"

Docker is not installed or not in your system PATH. Install [Docker Desktop](https://www.docker.com/products/docker-desktop) and restart your terminal.

### "port 5432 is already allocated"

Another service is using port 5432. Either:

- Stop the conflicting service: `docker-compose down`
- Or use a different port (see Port Conflict section)

### "Cannot find module '@types/...'"

Your dependencies aren't installed. Run:

```bash
npm install
```

### Database connection works but server won't start

Check that TypeScript compiled successfully:

```bash
npm run build
```

Review the error logs in the terminal for more details.

## Next Steps

- Set up authentication endpoints in the controllers
- Create database schemas using Sequelize models
- Configure API routes for courses, users, etc.
- Set up testing suite
- Deploy to production (consider using Docker for production as well)

## Environment Variables Reference

| Variable       | Description              | Example                 |
| -------------- | ------------------------ | ----------------------- |
| `PORT`         | Server port              | `5000`                  |
| `FRONTEND_URL` | Frontend origin for CORS | `http://localhost:3000` |
| `DB_USER`      | PostgreSQL username      | `coursehub_user`        |
| `DB_PASSWORD`  | PostgreSQL password      | `secure_password`       |

---

**Need help?** Check the logs in your terminal or create an issue in the repository.
