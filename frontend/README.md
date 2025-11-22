# User Registration System - Frontend

A modern, responsive user registration interface built with Next.js, React Hook Form, React Query, and shadcn/ui.

## Features

- ✅ Modern UI with shadcn/ui components
- ✅ Styled with Tailwind CSS v4
- ✅ Form validation with React Hook Form
- ✅ API state management with React Query
- ✅ Client-side and server-side validation
- ✅ Responsive design for all devices
- ✅ Dark mode support
- ✅ Type-safe with TypeScript
- ✅ Native Next.js fetch API integration

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Production Build
```bash
npm run build
npm start
```

## Pages & Routes

### Home (`/`)
- Welcome page with navigation to Sign Up and Login

### Sign Up (`/signup`)
- User registration form
- Fields: Email, Password, Confirm Password
- Real-time validation
- API integration with backend
- Success/error feedback
- Auto-redirect to login on success

### Login (`/login`)
- Login form (UI only - mock implementation)
- Fields: Email, Password
- Form validation
- Mock authentication feedback

## Project Structure

```
app/
├── page.tsx              # Home page
├── signup/
│   └── page.tsx         # Sign up page
├── login/
│   └── page.tsx         # Login page
├── layout.tsx           # Root layout with React Query provider
└── globals.css          # Global styles
components/
├── ui/                  # shadcn/ui components
│   ├── button.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── card.tsx
│   └── form.tsx
└── providers.tsx        # React Query provider
lib/
├── api.ts              # API client using fetch
└── utils.ts            # Utility functions
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI component library
- **React Hook Form** - Form management and validation
- **React Query** - Server state management
- **Native Fetch API** - HTTP requests

## Form Validation Rules

### Email
- Required field
- Must be valid email format
- Unique (validated by backend)

### Password
- Required field
- Minimum 6 characters
- Must match confirm password (signup only)

## API Integration

The frontend communicates with the backend using Next.js's native `fetch` API:

```typescript
// Registration
POST /user/register
Body: { email: string, password: string }
```

React Query handles:
- Loading states
- Error handling
- Automatic retries
- Cache management
- Optimistic updates

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
