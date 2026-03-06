# CourseHub — BUILD_PLAN.md

## Overview

CourseHub is a course platform where instructors can post and manage courses, and learners can discover, apply for, and track their enrollments. This document outlines the MVP scope, user experience, data models, and development phases.

---

## Users & Roles

| Role | Description |
|------|-------------|
| Instructor | Creates and manages courses, approves or rejects learner registrations |
| Learner | Browses courses, registers for them, and tracks enrollment status |

Role is assigned at sign-up and is immutable.

---

## Features

### Auth (Both Roles)
- Sign up with name, email, password, and role selection
- Log in and receive a JWT token
- All routes are protected; UI adapts based on role

---

### Instructor Experience

**My Courses Dashboard**
- View all courses they have posted
- Create a new course
- Edit or delete their own courses

**Registrations**
- View all registration requests per course
- Approve or reject each registration
- Approved registrations automatically enroll the learner

---

### Learner Experience

**Courses Page**
- Browse and search all available courses on the platform
- Register for any course (triggers a pending registration)

**My Courses Dashboard**
- View all courses grouped by status:
  - **Enrolled** — registration was approved
  - **Pending** — awaiting instructor decision
  - **Rejected** — registration was rejected

---

## Data Models

### User
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | String | |
| email | String | Unique |
| password | String | Hashed |
| role | Enum | `instructor` or `learner` |
| created_at | Timestamp | |

### Course
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| title | String | |
| description | Text | |
| instructor_id | UUID | FK → User |
| created_at | Timestamp | |

### Registration
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| learner_id | UUID | FK → User |
| course_id | UUID | FK → Course |
| status | Enum | `pending`, `approved`, `rejected` |
| created_at | Timestamp | |

### CourseLearner
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| learner_id | UUID | FK → User |
| course_id | UUID | FK → Course |
| enrolled_at | Timestamp | Auto-set on creation |

> `CourseLearner` is created automatically when a Registration status is updated to `approved`. It is never created directly by the user.

---

## Development Phases

### Phase 1 — Auth
- Sign up (with role selection)
- Log in
- JWT middleware
- Role-based route protection

### Phase 2 — Course Dashboard
- Instructor: Create course
- Learner: Browse and search courses (Courses page)

### Phase 3 — Course UD
- Instructor: Update and delete their own courses
- Guard: Instructors can only modify courses they own

### Phase 4 — Registration CRUD
- Learner: Register for a course
- Instructor: View, approve, or reject registrations
- Status field: `pending` → `approved` or `rejected`
- Learner: My Courses dashboard — **Pending only**

### Phase 5 — CourseLearner
- Auto-create `CourseLearner` record on registration approval
- Learner: My Courses dashboard — **Enrolled and Rejected**

---

## Key Rules

- An instructor can only see and manage their own courses
- A learner cannot register for the same course twice
- `CourseLearner` is only created via approval — never directly
- Deleting a course with active registrations or enrollments should be blocked or handled explicitly
