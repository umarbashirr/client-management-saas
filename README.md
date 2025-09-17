# Cliently | Client Management SaaS

A modern client management platform built with Next.js 15, featuring secure authentication, dashboard analytics, and a beautiful user interface. Currently in development with core infrastructure and UI components in place.

## 🚀 Features

### Current Implementation

- **Modern Dashboard**: Interactive analytics dashboard with charts and metrics
- **Authentication System**: Secure authentication with Better Auth
- **Responsive UI**: Beautiful interface built with shadcn/ui components
- **Database Integration**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript support throughout the application
- **Mobile-First Design**: Responsive layouts optimized for all devices

### Planned Features

- **Client Management**: Complete CRUD operations for client profiles
- **Project Tracking**: Manage projects, tasks, and deliverables
- **Invoice Management**: Create, send, and track invoices
- **Payment Processing**: Integrated payment gateway
- **Team Collaboration**: Multi-user support with role-based access
- **Advanced Analytics**: Real-time insights and reporting

### Technical Features

- **Authentication**: Better Auth with email/password and admin support
- **Modern UI**: shadcn/ui components with Radix UI primitives
- **Database**: PostgreSQL with Prisma ORM and migrations
- **App Router**: Next.js 15 App Router with route groups
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Interactive charts with Recharts
- **Icons**: Tabler Icons and Lucide React
- **Code Quality**: Biome for linting and formatting

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Runtime**: React 19.1.0
- **Authentication**: Better Auth 1.3.11
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS 4.0
- **Database**: PostgreSQL
- **ORM**: Prisma 6.16.2
- **Forms**: React Hook Form 7.62.0 + Zod 4.1.9
- **Icons**: Tabler Icons + Lucide React
- **Charts**: Recharts 2.15.4
- **Code Quality**: Biome 2.2.0
- **TypeScript**: 5.x

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- DodoPayments account
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd client-management-saas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/client_management"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Next.js
NEXTAUTH_URL="http://localhost:3000"

# Optional: Social Auth (for future implementation)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🎯 Current Status

The application is currently in active development with the following completed features:

- ✅ **Project Setup**: Next.js 15 with App Router, TypeScript, and Tailwind CSS
- ✅ **Authentication**: Better Auth integration with email/password authentication
- ✅ **Database**: PostgreSQL with Prisma ORM and migrations
- ✅ **UI Components**: shadcn/ui component library with responsive design
- ✅ **Dashboard**: Interactive analytics dashboard with charts and metrics
- ✅ **Code Quality**: Biome for linting and formatting
- ✅ **Route Groups**: Organized routing with auth, marketing, and protected areas

### In Development

- 🚧 **Authentication Pages**: Sign-in, sign-up, and password reset forms
- 🚧 **Client Management**: CRUD operations for client profiles
- 🚧 **Project Management**: Project tracking and task management
- 🚧 **Account Settings**: User profile and account management

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── (auth)/                   # Authentication route group
│   │   ├── (routes)/            # Auth pages
│   │   │   ├── sign-in/         # Sign in page
│   │   │   ├── sign-up/         # Sign up page
│   │   │   ├── forgot-password/ # Password reset
│   │   │   └── reset-password/  # Password reset form
│   │   ├── layout.tsx           # Auth layout
│   │   └── loading.tsx          # Auth loading state
│   ├── (marketing)/             # Marketing route group
│   │   ├── (routes)/            # Marketing pages
│   │   │   └── page.tsx         # Landing page
│   │   └── layout.tsx           # Marketing layout
│   ├── (protected)/             # Protected route group
│   │   ├── (routes)/            # Protected pages
│   │   │   ├── dashboard/       # Dashboard page
│   │   │   ├── clients/         # Clients management
│   │   │   ├── projects/        # Projects management
│   │   │   └── accounts/        # Account settings
│   │   ├── layout.tsx           # Protected layout
│   │   └── loading.tsx          # Protected loading state
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── favicon.ico              # Site favicon
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx           # Button component
│   │   ├── card.tsx             # Card component
│   │   ├── chart.tsx            # Chart components
│   │   ├── form.tsx             # Form components
│   │   ├── sidebar.tsx          # Sidebar component
│   │   └── ...                  # Other UI components
│   ├── app-sidebar.tsx          # Main app sidebar
│   ├── site-header.tsx          # Site header
│   ├── chart-area-interactive.tsx # Interactive charts
│   ├── section-cards.tsx        # Dashboard cards
│   ├── data-table.tsx           # Data table component
│   └── nav-*.tsx                # Navigation components
├── lib/                         # Utility libraries
│   ├── authentication/          # Auth configuration
│   │   ├── auth.ts              # Better Auth setup
│   │   ├── auth-client.ts       # Client-side auth
│   │   └── middleware.ts        # Auth middleware
│   ├── db/                      # Database configuration
│   │   ├── config.ts            # Prisma client setup
│   │   └── generated/           # Generated Prisma client
│   └── utils.ts                 # Utility functions
├── hooks/                       # Custom React hooks
│   └── use-mobile.ts            # Mobile detection hook
└── providers/                   # React context providers
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio
- `npm run db:push` - Push schema changes to database
- `npm run db:pull` - Pull schema from database
- `npm run db:reset` - Reset database and run migrations
- `npm run db:format` - Format Prisma schema

## 🔐 Authentication

The application uses Better Auth for secure authentication with the following features:

- **Email/Password Authentication**: Secure login with email and password
- **Session Management**: Persistent sessions with token-based authentication
- **Password Reset**: Secure password reset functionality
- **Email Verification**: Email verification for new accounts
- **Role-Based Access Control**: Admin and user roles with different permissions
- **Session Security**: IP address and user agent tracking
- **Admin Features**: Admin panel with user management capabilities

### Authentication Flow

1. **Sign Up**: Users can create accounts with email and password
2. **Email Verification**: New accounts require email verification
3. **Sign In**: Secure authentication with session management
4. **Password Reset**: Users can reset passwords via email
5. **Session Management**: Automatic session renewal and security tracking
6. **Admin Access**: Role-based access control for administrative functions

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. The current schema includes:

### Core Tables

- `user` - User accounts and profiles

  - `id` - Unique user identifier
  - `name` - User's display name
  - `email` - User's email address (unique)
  - `emailVerified` - Email verification status
  - `image` - User's profile image URL
  - `role` - User role (admin, user)
  - `banned` - Ban status
  - `banReason` - Reason for ban
  - `banExpires` - Ban expiration date
  - `createdAt` - Account creation timestamp
  - `updatedAt` - Last update timestamp

- `session` - User sessions

  - `id` - Session identifier
  - `expiresAt` - Session expiration
  - `token` - Session token (unique)
  - `ipAddress` - Client IP address
  - `userAgent` - Client user agent
  - `userId` - Reference to user
  - `impersonatedBy` - Admin impersonation tracking

- `account` - OAuth and social accounts

  - `id` - Account identifier
  - `accountId` - Provider account ID
  - `providerId` - OAuth provider
  - `userId` - Reference to user
  - `accessToken` - OAuth access token
  - `refreshToken` - OAuth refresh token
  - `idToken` - OAuth ID token
  - `accessTokenExpiresAt` - Token expiration
  - `refreshTokenExpiresAt` - Refresh token expiration
  - `scope` - OAuth scope
  - `password` - Hashed password (for email/password auth)

- `verification` - Email verification tokens
  - `id` - Verification identifier
  - `identifier` - Email or phone being verified
  - `value` - Verification code/token
  - `expiresAt` - Token expiration
  - `createdAt` - Creation timestamp
  - `updatedAt` - Last update timestamp

## 🎨 UI Components

Built with shadcn/ui and Radix UI primitives, the application includes:

- **Form Components**: React Hook Form integration with Zod validation
- **Data Tables**: Sortable and filterable data tables with TanStack Table
- **Charts**: Interactive charts with Recharts for analytics
- **Navigation**: Sidebar navigation with collapsible sections
- **Cards**: Dashboard cards with metrics and trends
- **Modals & Dialogs**: Alert dialogs, sheets, and drawers
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Icons**: Tabler Icons and Lucide React icon library
- **Themes**: Dark/light mode support with next-themes

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔄 Development Roadmap

### Phase 1 (Current - In Progress)

- [x] Project setup and infrastructure
- [x] Authentication system with Better Auth
- [x] Database schema and migrations
- [x] UI component library setup
- [x] Dashboard with analytics
- [ ] Complete authentication pages (sign-in, sign-up, password reset)
- [ ] Client management CRUD operations
- [ ] Project management features
- [ ] Account settings and user profile

### Phase 2 (Next)

- [ ] Invoice management system
- [ ] Payment integration
- [ ] Advanced analytics and reporting
- [ ] Team collaboration features
- [ ] API documentation
- [ ] Email notifications

### Phase 3 (Future)

- [ ] Mobile application
- [ ] Advanced integrations
- [ ] Multi-tenant support
- [ ] White-label options
- [ ] Advanced reporting and insights

---

Built with ❤️ using Next.js 15, Better Auth, Prisma, and shadcn/ui
