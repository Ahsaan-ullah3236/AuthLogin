# AuthLogin

Login, profile, dashboard, and per-user activity CRUD with a React/Vite client,
Express API, and PostgreSQL database.

## Project structure

```text
backend/
  app.js                 Express middleware and API route composition
  server.js              Startup, readiness check, and graceful shutdown
  config/                PostgreSQL pool
  controllers/           HTTP request and response handling
  middleware/            Authentication, rate limiting, and error handling
  migrations/            Database schema changes
  routes/                API endpoint definitions
  scripts/               Database migration runner
  services/              Authentication and activity business/database logic
  validators/            Request input validation
  utils/                 Shared backend utilities
client/src/
  app/                   Frontend route composition
  components/            Dashboard and activity UI pieces
  lib/                   Shared API client
  pages/                 Login, signup, profile, and dashboard screens
```

## Run locally

Prerequisites: Node.js, npm, and PostgreSQL. Configure `backend/.env` with
`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and `JWT_SECRET`.
`JWT_REFRESH_SECRET` is optional; it falls back to `JWT_SECRET`.

In one terminal:

```powershell
cd backend
npm install
npm run migrate
npm run dev
```

In another terminal:

```powershell
cd client
npm install
npm run dev
```

The Vite development server forwards `/api` requests to the backend on port
5000. For deployment, set `CORS_ORIGIN` to the comma-separated frontend origin
list and configure database/JWT secrets through the hosting environment.