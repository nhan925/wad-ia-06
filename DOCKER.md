# 🐳 Docker Guide - User Registration System

Complete guide for running the application with Docker. Everything you need in one place.

## 📋 Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose (usually included with Docker Desktop)
- At least 2GB of free RAM
- Ports 3000, 3001, and 5432 available

## ⚡ Database Tables - Auto-Created!

**Important:** You don't need to manually create database tables. TypeORM automatically creates the `users` table when the backend starts.

**What happens:**
1. Backend connects to PostgreSQL
2. TypeORM reads the `User` entity (`src/user/entities/user.entity.ts`)
3. Table is automatically created with this structure:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);
```

**Note:** In production, set `synchronize: false` in TypeORM config and use migrations instead.

## 🚀 Quick Start

### 1. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your preferred values:
```env
DATABASE_USER=postgres
DATABASE_PASSWORD=your_secure_password
DATABASE_NAME=user_registration_db
DATABASE_PORT=5432
```

### 2. Build and Start All Services

```bash
docker-compose up -d
```

View logs:
```bash
docker-compose logs -f
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: localhost:5432

**That's it!** The database table will be created automatically when the backend starts.

## 📦 Docker Services

### PostgreSQL Database
- **Image**: postgres:15-alpine
- **Port**: 5432
- **Volume**: Persistent data storage
- **Health Check**: Ensures database is ready before starting backend

### Backend (NestJS)
- **Build**: Multi-stage Docker build for optimized image
- **Port**: 3001
- **Dependencies**: Waits for PostgreSQL to be healthy
- **Health Check**: HTTP check on main endpoint

### Frontend (Next.js)
- **Build**: Multi-stage Docker build for optimized image
- **Port**: 3000
- **Dependencies**: Waits for backend to be ready
- **Health Check**: HTTP check on main page

## 🔧 Common Commands

### Start Services
```bash
# Start all services in detached mode
docker-compose up -d

# Start and view logs
docker-compose up

# Start specific service
docker-compose up -d backend
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v

# Stop specific service
docker-compose stop backend
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Rebuild Services
```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build backend

# Rebuild and restart
docker-compose up -d --build
```

### Execute Commands in Containers
```bash
# Access backend container shell
docker-compose exec backend sh

# Access database
docker-compose exec postgres psql -U postgres -d user_registration_db

# Run npm commands in backend
docker-compose exec backend npm run test

# View backend logs
docker-compose exec backend cat /app/logs/error.log
```

### Check Container Status
```bash
# List running containers
docker-compose ps

# View resource usage
docker stats

# Check health status
docker-compose ps
```

## 🗄️ Database Management

### Verify Table Creation

After starting the services, verify the `users` table was created:

```bash
# Access PostgreSQL
docker-compose exec postgres psql -U postgres -d user_registration_db

# List tables
\dt

# Describe users table structure
\d users

# View all users
SELECT * FROM users;

# Exit
\q
```

Expected table structure:
```sql
Table "public.users"
   Column   |           Type           | Nullable |      Default
------------+--------------------------+----------+-------------------
 id         | uuid                     | not null | gen_random_uuid()
 email      | text                     | not null |
 password   | text                     | not null |
 createdAt  | timestamptz              | not null | now()
Indexes:
    "PK_users_id" PRIMARY KEY, btree (id)
    "UQ_users_email" UNIQUE CONSTRAINT, btree (email)
```

### Quick Database Commands

```bash
# Access PostgreSQL CLI
docker-compose exec postgres psql -U postgres -d user_registration_db

# View all tables
docker-compose exec postgres psql -U postgres -d user_registration_db -c "\dt"

# Count registered users
docker-compose exec postgres psql -U postgres -d user_registration_db -c "SELECT COUNT(*) FROM users;"

# View all users (passwords are hashed)
docker-compose exec postgres psql -U postgres -d user_registration_db -c "SELECT id, email, \"createdAt\" FROM users;"
```

### Backup & Restore

```bash
# Backup database
docker-compose exec postgres pg_dump -U postgres user_registration_db > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres -d user_registration_db < backup.sql
```

## 🔍 Troubleshooting

### Table Not Created?

**Check backend logs:**
```bash
docker-compose logs backend | grep -i "table\|migration\|database"
```

**Manually trigger table creation:**
```bash
# Restart backend (TypeORM will recreate tables)
docker-compose restart backend

# Or recreate everything
docker-compose down -v
docker-compose up -d
```

### Services Won't Start

```bash
# Check logs
docker-compose logs

# Common fixes:
# 1. Ports in use - change ports in docker-compose.yml
# 2. Not enough memory - increase Docker memory limit
# 3. Build errors - check syntax
```

### Database Connection Issues

```bash
# Verify database is running
docker-compose ps postgres

# Check database health
docker-compose exec postgres pg_isready -U postgres

# View database logs
docker-compose logs postgres
```

### Backend Can't Connect to Database

```bash
# Check backend logs
docker-compose logs backend

# Verify environment variables
docker-compose exec backend env | grep DATABASE

# Restart backend
docker-compose restart backend
```

### Frontend Can't Connect to Backend

```bash
# Check API URL
docker-compose exec frontend env | grep NEXT_PUBLIC

# Test backend directly
curl http://localhost:3001

# Check CORS in src/main.ts
```

### Clean Everything and Start Fresh

```bash
# Stop all services and remove volumes (deletes data!)
docker-compose down -v

# Remove all Docker resources
docker system prune -a --volumes

# Start fresh
docker-compose up -d --build
```

## 🚀 Production Deployment

### Cloud Platforms

**Railway.app (Recommended - Free Tier):**
1. Connect GitHub repository
2. Add PostgreSQL database
3. Deploy backend and frontend services
4. Set environment variables

**Render.com:**
1. Create PostgreSQL database
2. Deploy backend as Web Service
3. Deploy frontend as Static Site
4. Configure environment variables

**AWS/Google Cloud/Azure:**
- Use container services (ECS, Cloud Run, Container Instances)
- Deploy docker images directly
- Set up managed PostgreSQL database

### Important for Production

1. **Change database password in `.env`**
2. **Set `synchronize: false` in `src/app.module.ts`**
   ```typescript
   synchronize: false, // Use migrations in production
   ```
3. **Create database migrations:**
   ```bash
   npm run migration:generate -- -n CreateUsersTable
   npm run migration:run
   ```
4. **Remove database port exposure** in docker-compose.yml
5. **Enable HTTPS** for frontend and backend
6. **Add rate limiting** to prevent abuse
7. **Set up monitoring** and logging

## 📊 Testing the Application

### 1. Register a New User

**Via Frontend:**
- Go to http://localhost:3000
- Click "Sign Up"
- Enter email and password
- Submit the form

**Via API (curl):**
```bash
curl -X POST http://localhost:3001/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456"}'
```

**Via API (PowerShell):**
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/user/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"test@example.com","password":"test123456"}'
```

### 2. Verify User in Database

```bash
# Connect to database
docker-compose exec postgres psql -U postgres -d user_registration_db

# View registered users (passwords will be hashed)
SELECT id, email, "createdAt" FROM users;
```

### 3. Check Application Logs

```bash
# All logs
docker-compose logs -f

# Backend logs only
docker-compose logs -f backend

# Frontend logs only
docker-compose logs -f frontend
```

## 📝 Configuration Reference

### Backend Environment Variables (backend/.env)

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password  # CHANGE THIS!
DATABASE_NAME=user_registration_db
PORT=3001
```

### Frontend Environment Variables (frontend/.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Port Mapping

- **Frontend**: 3000 → http://localhost:3000
- **Backend**: 3001 → http://localhost:3001
- **Database**: 5432 → localhost:5432

### Files Overview

```
source/
├── docker-compose.yml          # Docker orchestration
├── backend/
│   ├── .env                    # Backend environment variables
│   ├── .env.example            # Backend env template
│   ├── Dockerfile              # Backend image
│   └── .dockerignore
└── frontend/
    ├── .env.local              # Frontend environment variables
    ├── Dockerfile              # Frontend image
    └── .dockerignore
```

## ✅ Complete Workflow

**First Time Setup:**
```bash
# 1. Configure backend environment
cd backend
cp .env.example .env
# Edit .env and set DATABASE_PASSWORD
cd ..

# 2. Start all services (builds images automatically)
docker-compose up -d

# 3. View logs
docker-compose logs -f
```

**Access Application:**
- Frontend: http://localhost:3000
- Create an account via Sign Up page
- Tables are created automatically!

**Check Database:**
```bash
docker-compose exec postgres psql -U postgres -d user_registration_db -c "SELECT * FROM users;"
```

**Stop Services:**
```bash
docker-compose down
```

---

## 🆘 Need Help?

**Check logs first:**
```bash
docker-compose logs -f
```

**Common Issues:**
1. **Port already in use** → Stop other services or change ports
2. **Table not created** → Check backend logs, restart backend
3. **Can't connect** → Verify services are running with `docker-compose ps`

**For more help, see the main README.md**
