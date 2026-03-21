# CourseHub Backend Docker Guide

This document focuses on running PostgreSQL with Docker and the current backend structure.

## Docker Database Workflow

### Start PostgreSQL

```bash
docker compose up -d
```

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

Use your configured DB user from `.env`:

```bash
docker exec -it postgres_db psql -U <DB_USER> -d course_hub
```

Useful `psql` commands:

```sql
\dt
SELECT * FROM users;
```

### Stop PostgreSQL

```bash
docker compose down
```

### Stop and Remove Database Volume

```bash
docker compose down -v
```

Use this only when you want a clean database state.

## Database Notes

- Service config is in `docker-compose.yml`.
- Database name is `course_hub`.
- Data persists in Docker volume `db_data`.
- Backend startup initializes models and runs Sequelize sync to create missing tables.

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

## Current Backend Structure

```text
backend/
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── app.ts
    ├── index.ts
    ├── routes.ts
    ├── server.ts
    ├── controllers/
    │   ├── authController.ts
    │   └── userController.ts
    └── models/
        └── users.ts
```

## Common Docker Issues

### Port 5432 Already In Use (Windows)

Check listener:

```powershell
Get-NetTCPConnection -LocalPort 5432 -State Listen
```

If local PostgreSQL is occupying the port, stop it or remap the container port in `docker-compose.yml`.

### No Tables Found in psql

- Confirm you are connected to `course_hub`.
- Confirm you are using the same DB user as `.env` (`DB_USER`).
- Start backend once so Sequelize can initialize and sync models.
