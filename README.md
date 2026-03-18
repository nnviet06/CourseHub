# CourseHub 🎓

> A platform for uploading, sharing, and discovering courses — whether you're a creator or a learner.

---

## Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | Next.js             |
| Backend  | Node.js + Express   |
| Database | PostgreSQL          |
| Auth     | JWT                 |

---

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) v14+
- npm or yarn

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nnviet06/coursehub.git
cd coursehub
```

### 2. Set up environment variables

Copy the example env files and fill in your values:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

**Backend `.env` variables:**

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/coursehub
JWT_SECRET=your_jwt_secret
```

**Frontend `.env` variables:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Install dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### 4. Set up the database

```bash
cd backend
npm run db:migrate
npm run db:seed   # optional: seed with sample data
```

### 5. Run the development servers

In separate terminal windows:

```bash
# Frontend (runs on http://localhost:3000)
cd frontend && npm run dev

# Backend (runs on http://localhost:5000)
cd backend && npm run dev
```

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

