## Personal Finance App (Full Stack)

Monorepo including React frontend, Node/Express backend, and Python FastAPI AI microservice, orchestrated via Docker Compose with MySQL.

### Services
- frontend: Vite + React + Tailwind + Redux Toolkit + Recharts
- backend: Node.js + Express + Sequelize + JWT + MySQL
- ai: Python + FastAPI for analytics/suggestions
- db: MySQL 8

### Quick Start (Docker)
1. Copy environment templates:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
2. Start services:
   - `docker compose up --build`
3. Open:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000/api
   - AI Service: http://localhost:8000/docs

### Local Development
- Frontend: `cd frontend && npm install && npm run dev`
- Backend: `cd backend && npm install && npm run dev`
- AI service: `cd ai-service && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn main:app --reload`

### Environment Variables
- See `backend/.env.example` and `frontend/.env.example` for required variables.

# SmartSaver – AI Personal Finance Manager

SmartSaver is a web-based personal finance manager that helps users analyze their past 3 months of expenses and provides AI-powered recommendations to save up to 10% of their spending. It features a dynamic dashboard, expense tracking, and actionable insights for better financial management.

## Features
- Track expenses manually or via bank integration (future feature)
- Categorize spending (e.g., groceries, entertainment, subscriptions)
- Analyze last 3 months of transactions
- AI-powered suggestions to reduce expenses
- Visual dashboards with interactive charts
- Set monthly budgets and track savings goals

## Tech Stack
- **Frontend:** React.js with Material-UI / Tailwind CSS
- **Backend:** Node.js + Express.js or Java Spring Boot
- **Database:** MySQL / SQL
- **AI Module:** Python (Pandas, NumPy, Scikit-learn) for savings analysis
- **Deployment:** Vercel (Frontend), Render/Heroku/AWS (Backend & AI Module), MySQL cloud


