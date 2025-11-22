# 🚀 User Registration System (IA03)

A complete full-stack user registration system with a NestJS backend and Next.js frontend.

## 📋 Overview

This project implements a modern user registration system featuring:
- **Backend**: RESTful API built with NestJS, TypeORM, and PostgreSQL
- **Frontend**: Responsive React application using Next.js, shadcn/ui, and Tailwind CSS
- **Authentication**: Secure password hashing with bcrypt
- **Validation**: Strong password requirements with both client-side and server-side validation
- **Notifications**: Toast notifications for user feedback
- **State Management**: React Query for efficient API communication

## 🎯 Features

### Backend (NestJS)
- ✅ User registration endpoint (`POST /user/register`)
- ✅ PostgreSQL database with TypeORM
- ✅ Password hashing with bcrypt
- ✅ Email uniqueness validation
- ✅ Input validation with class-validator
- ✅ CORS enabled for frontend
- ✅ Environment-based configuration
- ✅ Comprehensive error handling

### Frontend (Next.js)
- ✅ Modern UI with shadcn/ui components
- ✅ Tailwind CSS v4 styling
- ✅ React Hook Form for form management
- ✅ React Query for API state
- ✅ Native Next.js fetch API
- ✅ Responsive design
- ✅ Dark mode support
- ✅ TypeScript throughout
- ✅ Real-time form validation

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM (auto-creates tables via `synchronize: true`)
- **Validation**: class-validator, class-transformer
- **Security**: bcrypt for password hashing
- **Language**: TypeScript

**Note:** Database tables are automatically created when the backend starts. No manual SQL needed!

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Forms**: React Hook Form
- **API Client**: React Query + Native Fetch
- **Language**: TypeScript

## 📦 Project Structure

```
source/
├── backend/          # Backend (NestJS)
│   ├── src/
│   │   ├── user/          # User module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example
│   └── package.json
│
└── frontend/          # Frontend (Next.js)
    ├── app/               # Pages
    ├── components/        # React components
    ├── lib/              # Utilities & API
    ├── .env.local
    └── package.json
```

## 🚀 Getting Started

You can run this project in two ways:

### Option 1: 🐳 Docker (Recommended)

**Prerequisites:** Docker Desktop installed

```bash
# 1. Configure backend environment
cd wad-ia-06-be
cp .env.example .env
# Edit .env and set DATABASE_PASSWORD
cd ..

# 2. Start everything
docker-compose up -d

# Access at http://localhost:3000
```

**See [DOCKER.md](./DOCKER.md) for complete documentation.**

### Option 2: 💻 Local Development

**Prerequisites:**
- Node.js v18 or higher
- PostgreSQL installed and running
- npm or yarn package manager

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE user_registration_db;
   ```

4. **Configure environment variables:**
   
   Create a `.env` file (use `.env.example` as template):
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=user_registration_db
   PORT=3001
   ```

5. **Start the backend server:**
   ```bash
   npm run start:dev
   ```
   
   Backend will run at `http://localhost:3001`

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run at `http://localhost:3000`

## 📖 Usage

1. **Open your browser** and navigate to `http://localhost:3000`

2. **From the home page**, you can:
   - Click "Sign Up" to create a new account
   - Click "Log In" to access the login page

3. **Sign Up Process**:
   - Enter your email address
   - Create a password (must meet requirements: 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
   - Confirm your password
   - Click "Sign Up" button
   - On success, you'll see a success toast and be redirected to the login page

4. **Login Page** (UI only - mock implementation):
   - Enter credentials
   - Receive mock authentication feedback

## 🔌 API Endpoints

### POST `/user/register`

Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "createdAt": "2025-11-22T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid email format or password doesn't meet requirements
- `409 Conflict` - Email already registered
- `500 Internal Server Error` - Server error

## ✅ Validation Rules

### Email
- Required field
- Must be valid email format
- Must be unique (checked against database)

### Password
- Required field
- **Minimum length: 8 characters**
- **Must contain at least:**
  - 1 uppercase letter (A-Z)
  - 1 lowercase letter (a-z)
  - 1 number (0-9)
  - 1 special character (@$!%*?&)
- Hashed before storage (bcrypt with 10 salt rounds)

### Confirm Password (Frontend only)
- Must match the password field

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **Input Validation**: Both client and server-side
- **CORS Protection**: Configured for specific origins
- **Environment Variables**: Sensitive data kept secure
- **SQL Injection Prevention**: TypeORM parameterized queries
- **XSS Protection**: React's built-in escaping

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Mode**: Automatic theme detection
- **Loading States**: Visual feedback during API calls
- **Error Messages**: Clear, user-friendly error messages
- **Success Feedback**: Confirmation messages and redirects
- **Accessibility**: Semantic HTML and ARIA labels

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Coverage report
```

### Frontend Tests
```bash
cd frontend
npm run lint          # ESLint check
npm run build         # Production build test
```

## 📚 Additional Documentation

- [DOCKER.md](./DOCKER.md) - Complete Docker guide (setup, usage, deployment, troubleshooting)
- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation

## 🚢 Deployment

**For production deployment instructions, see [DOCKER.md](./DOCKER.md#-production-deployment)**

**Recommended Platforms:**
- **Docker**: Railway, Render (easiest - deploy docker-compose.yml directly)
- **Backend**: Railway, Render, Heroku
- **Frontend**: Vercel (recommended for Next.js), Netlify
- **Database**: Railway PostgreSQL, Supabase, AWS RDS

## 🤝 Contributing

This is an academic project (IA03 assignment). For improvements or suggestions, please contact the project maintainer.

## 📄 License

This project is for educational purposes as part of Web Application Development coursework.

## 👨‍💻 Author

HCMUS - Year 4, Semester 1
Web Application Development Course

## 🆘 Troubleshooting

### Database tables not created
- Tables are auto-created by TypeORM when backend starts
- Check backend logs: look for "synchronize" messages
- If using Docker: `docker-compose logs backend`

### Backend won't start
- Ensure PostgreSQL is running
- Check `.env` file has correct database credentials
- If using Docker: `docker-compose ps postgres`

### Frontend can't connect to backend
- Verify backend is running on `http://localhost:3001`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Ensure CORS is properly configured in `src/main.ts`

### Registration fails
- Check backend logs for detailed error messages
- Verify email format is valid
- Ensure password meets all requirements (8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
- Check database connection

## 📞 Support

For questions or issues related to this assignment, please contact your course instructor or TA.

---

**Built with ❤️ using NestJS, Next.js, and modern web technologies**
