# Personal Finance Tracker (Monorepo)

Services:
- backend: Node.js + Express + JWT + MySQL
- ai-service: Python + FastAPI (recommendations)
- frontend: React + Vite + MUI + Redux Toolkit + Recharts
- db: MySQL init scripts

## Quickstart (Docker)
1. Copy env: `cp .env.example .env` and update values
2. Build & run: `docker compose up --build`
3. Frontend: http://localhost:5173
4. Backend: http://localhost:8080/api/health
5. AI Service: http://localhost:8000/health
6. MySQL: localhost:3306 (user: fin_user / fin_pass)

## Local Dev (without Docker)
- Backend
  - `cd backend && cp ../.env.example ../.env`
  - `npm install`
  - `npm run dev`
- AI Service
  - `cd ai-service && python -m venv .venv && source .venv/bin/activate`
  - `pip install -r requirements.txt`
  - `uvicorn app.main:app --reload`
- Frontend
  - `cd frontend && npm install`
  - `cp .env.example .env`
  - `npm run dev`

## API Endpoints
- `POST /api/auth/signup { name, email, password }`
- `POST /api/auth/login { email, password }`
- `GET /api/transactions` (Bearer)
- `POST /api/transactions` (Bearer)
- `PUT /api/transactions/:id` (Bearer)
- `DELETE /api/transactions/:id` (Bearer)
- `GET /api/dashboard` (Bearer)
- `GET /api/analytics` (Bearer)

## Notes
- AI service suggests 10% reductions for top categories in last 3 months
- Charts: Pie (by category), Line (monthly), Bar (suggested savings)
