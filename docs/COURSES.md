# Courses
Document for implementation on Courses

## Backend

### Schema

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key, not null, default gen_random_uuid() |
| instructor_id | uuid | not null, references users(id) |
| title | string(50) | not null, check title <> '' |
| created_at | timestamptz | not null, default NOW() |
| updated_at | timestamptz | not null, default NOW() |

### Migration

Generate:
```bash
npx sequelize-cli migration:generate --name create-courses
```

Run:
```bash
npx sequelize-cli db:migrate
```

Roll back:
```bash
npx sequelize-cli db:migrate:undo
```

### Verify Table

Connect to the database:
```bash
docker exec -it postgres_db psql -U coursehub_user -d course_hub
```

List all tables:
```sql
\dt
```

Inspect courses table columns:
```sql
\d courses
```

### Policies (Postgres)
