# Courses

Document for implementation on Courses

## Backend

### Schema 

| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key not null default gen_random_uuid() |
| instructor_id | uuid | not null references users(id) |
| title | string(50) | not null and <> '' |
| created_at | timestamptz | not null default Date.now() |
| updated_at | timestamptz | not null default Date.now() |

### Policies (Postgres)
