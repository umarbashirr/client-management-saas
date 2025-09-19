# Cliently | Client Management SaaS

A comprehensive, modern client management platform built with Next.js 15, featuring secure multi-tenant authentication, interactive dashboards, and enterprise-grade audit logging. Currently in active development with a robust foundation and comprehensive system architecture.

## 🚀 Features

### ✅ Currently Implemented

- **🔐 Complete Authentication System**: Full authentication flow with Better Auth including sign-in, sign-up, password reset, email verification, and social auth (Google, GitHub)
- **🏢 Multi-tenant Workspace Management**: Organization-based workspace creation, management, and team collaboration
- **📊 Interactive Dashboard**: Modern analytics dashboard with interactive charts, metrics cards, and responsive design
- **🔍 Comprehensive Audit Logging**: Enterprise-grade audit trail with multi-tenant support, IP tracking, user agents, and detailed metadata
- **🗄️ Multi-tenant Database**: PostgreSQL with Prisma ORM, organization-based data isolation, and comprehensive schema
- **🎨 Modern UI/UX**: Beautiful interface built with shadcn/ui components, Radix UI primitives, and Tailwind CSS
- **📱 Mobile-First Design**: Fully responsive layouts optimized for all devices with mobile-specific optimizations
- **✅ Form Validation**: React Hook Form with Zod validation schemas for type-safe form handling
- **📧 Email Integration**: Resend integration for transactional emails, password reset, and verification
- **🔒 Security Features**: Role-based access control, session management, and comprehensive security patterns
- **⚡ Performance Optimized**: Next.js 15 with Turbopack, optimized builds, and modern React patterns

### 🚧 In Active Development

- **👥 Team Management**: Advanced team member invitation system and role-based permissions
- **📋 Client Management**: Complete CRUD operations for client profiles and contact management
- **📁 Project Management**: Project tracking, task management, and collaboration features
- **⚙️ Account Settings**: User profile management and workspace configuration
- **🔔 Real-time Features**: WebSocket integration for real-time collaboration and notifications

### 🎯 Planned Features

- **💼 Invoice Management**: Create, send, and track invoices with PDF generation
- **💳 Payment Processing**: Integrated payment gateway with Stripe
- **📈 Advanced Analytics**: Real-time insights, reporting, and business intelligence
- **🔍 Search & Indexing**: Full-text search across all workspace data
- **📁 File Management**: Central file repository with versioning and project associations
- **💬 Communication System**: Project messaging, threading, and collaboration tools
- **🔗 Integrations**: Slack, Teams, Gmail, and other third-party integrations

### Technical Features

- **Authentication**: Better Auth with email/password, social auth (Google, GitHub), and admin support
- **Modern UI**: shadcn/ui components with Radix UI primitives
- **Database**: PostgreSQL with Prisma ORM, migrations, and multi-tenant architecture
- **App Router**: Next.js 15 App Router with route groups
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Interactive charts with Recharts
- **Icons**: Tabler Icons and Lucide React
- **Code Quality**: Biome for linting and formatting
- **Audit System**: Comprehensive logging with IP tracking, user agents, and metadata
- **Email System**: Resend integration for transactional emails
- **System Design**: Comprehensive algorithms and patterns documented in [SYSTEM_ALGORITHMS.md](./SYSTEM_ALGORITHMS.md)

## 🛠️ Tech Stack

### Core Framework & Runtime

- **Framework**: Next.js 15.5.3 with App Router and Turbopack
- **Runtime**: React 19.1.0 with modern concurrent features
- **Language**: TypeScript 5.x with strict type checking
- **Styling**: Tailwind CSS 4.0 with custom design system

### Authentication & Security

- **Authentication**: Better Auth 1.3.11 with multi-provider support
- **Social Auth**: Google OAuth, GitHub OAuth
- **Session Management**: Secure session handling with IP tracking
- **Security**: Role-based access control, audit logging

### Database & Data Management

- **Database**: PostgreSQL with connection pooling
- **ORM**: Prisma 6.16.2 with type-safe database access
- **Migrations**: Automated schema migrations and versioning
- **Multi-tenancy**: Organization-based data isolation

### UI/UX & Components

- **Component Library**: shadcn/ui with Radix UI primitives
- **Icons**: Tabler Icons 3.35.0 + Lucide React 0.544.0
- **Charts**: Recharts 2.15.4 for interactive data visualization
- **Forms**: React Hook Form 7.62.0 + Zod 4.1.9 for validation
- **Drag & Drop**: @dnd-kit for advanced interactions
- **Notifications**: Sonner for toast notifications

### Development & Quality

- **Code Quality**: Biome 2.2.0 for linting and formatting
- **Type Safety**: Full TypeScript coverage with strict mode
- **Email**: Resend integration with React Email templates
- **Data Fetching**: SWR for client-side data management

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

The application is currently in **Phase 1 (Foundation)** with a comprehensive system design and robust infrastructure. Here's what's been accomplished:

### ✅ Completed Foundation (Phase 1)

- **🏗️ Project Infrastructure**: Next.js 15 with App Router, TypeScript, Tailwind CSS, and Biome for code quality
- **🔐 Authentication System**: Complete auth flow with Better Auth, social auth (Google, GitHub), password reset, and email verification
- **🗄️ Database Architecture**: PostgreSQL with Prisma ORM, comprehensive migrations, and multi-tenant organization-based schema
- **🎨 UI Component Library**: Complete shadcn/ui component library with responsive design and mobile-first approach
- **📊 Dashboard System**: Interactive analytics dashboard with Recharts, metrics cards, and responsive charts
- **🏢 Workspace Management**: Multi-tenant workspace creation, organization management, and team collaboration foundation
- **🔍 Audit System**: Enterprise-grade audit logging with multi-tenant support, IP tracking, and comprehensive metadata
- **📧 Email Integration**: Resend integration for transactional emails with React Email templates
- **✅ Form System**: React Hook Form with Zod validation schemas for type-safe form handling
- **🛡️ Security Foundation**: Role-based access control, session management, and security patterns
- **📱 Mobile Optimization**: Responsive layouts with mobile-specific optimizations and touch-friendly interfaces

### 🚧 Currently In Development

- **👥 Advanced Team Management**: Team member invitation system with role-based permissions
- **📋 Client Management**: Complete CRUD operations for client profiles and contact management
- **📁 Project Management**: Project tracking, task management, and collaboration features
- **⚙️ Account Settings**: User profile management and workspace configuration
- **🔔 Real-time Features**: WebSocket integration for real-time collaboration and notifications

### System Design Complete

The comprehensive system algorithms document ([SYSTEM_ALGORITHMS.md](./SYSTEM_ALGORITHMS.md)) provides detailed blueprints for:

- 25 core algorithms covering all major user flows
- Multi-tenant architecture patterns
- Real-time collaboration systems
- Financial operations and payment processing
- Security and compliance frameworks
- Scalability and performance optimizations

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

## 🏗️ System Architecture

Cliently is built as a comprehensive client management SaaS platform with a focus on collaboration, project management, and business operations. The system follows a microservices-oriented architecture with clear separation of concerns.

### Core Architecture Principles

- **Multi-tenant SaaS**: Workspace-based isolation with shared infrastructure
- **Event-driven Design**: Asynchronous processing with event sourcing patterns
- **Real-time Collaboration**: WebSocket-based real-time updates
- **Security-first**: Role-based access control and audit logging
- **Scalable**: Designed for horizontal scaling and high availability

### Key System Components

- **Authentication Layer**: Better Auth with session management and role-based access
- **API Layer**: Next.js App Router with server actions and API routes
- **Database Layer**: PostgreSQL with Prisma ORM and connection pooling
- **File Storage**: Cloud storage with virus scanning and versioning
- **Search Engine**: Full-text search across all workspace data
- **Notification System**: Real-time and email notifications with digesting
- **Payment Processing**: Stripe integration with webhook handling
- **Audit System**: Immutable audit trail for compliance

For detailed system algorithms and implementation patterns, see [SYSTEM_ALGORITHMS.md](./SYSTEM_ALGORITHMS.md).

## 🔄 Development Roadmap

### ✅ Phase 1: Foundation (COMPLETED)

**Core Infrastructure**

- [x] Project setup with Next.js 15, TypeScript, and Tailwind CSS
- [x] Authentication system with Better Auth and social providers
- [x] Database schema with Prisma ORM and multi-tenant architecture
- [x] Complete UI component library with shadcn/ui
- [x] Interactive dashboard with analytics and charts
- [x] Email system with Resend integration
- [x] Comprehensive audit logging system

**User Management**

- [x] Complete authentication pages (sign-in, sign-up, password reset)
- [x] Social authentication (Google, GitHub)
- [x] Email verification and password reset system
- [x] Workspace creation and organization management
- [x] Multi-tenant database architecture
- [x] Basic permission system foundation

### 🚧 Phase 2: Core Features (IN PROGRESS)

**Team & Workspace Management**

- [x] Workspace creation and management
- [ ] Advanced team member invitation system
- [ ] Role-based permission system implementation
- [ ] Workspace settings and configuration

**Client & Project Management**

- [ ] Client management CRUD operations
- [ ] Project creation and management
- [ ] Task management and assignment
- [ ] Project collaboration features

**User Experience**

- [ ] Account settings and user profile management
- [ ] Advanced dashboard customization
- [ ] Mobile app optimization

### 🎯 Phase 3: Collaboration & Communication (NEXT)

**Real-time Features**

- [ ] WebSocket integration for real-time updates
- [ ] Live collaboration and notifications
- [ ] Real-time chat and messaging system

**File & Document Management**

- [ ] File upload and management system
- [ ] Document versioning and collaboration
- [ ] Advanced file sharing and permissions

**Search & Discovery**

- [ ] Full-text search across all workspace data
- [ ] Advanced filtering and sorting
- [ ] Search analytics and insights

### 💼 Phase 4: Business Operations (FUTURE)

**Financial Management**

- [ ] Invoice creation and PDF generation
- [ ] Payment processing with Stripe integration
- [ ] Financial reporting and analytics
- [ ] Expense tracking and management

**Advanced Analytics**

- [ ] Business intelligence dashboard
- [ ] Custom reporting and insights
- [ ] Performance metrics and KPIs

### 🚀 Phase 5: Scale & Enterprise (FUTURE)

**Platform Features**

- [ ] Mobile application (React Native)
- [ ] Advanced integrations (Slack, Teams, Gmail)
- [ ] API documentation and webhooks
- [ ] White-label and customization options

**Enterprise Features**

- [ ] Advanced security and compliance (SOC 2, GDPR)
- [ ] Enterprise SSO integration
- [ ] Advanced audit and compliance reporting
- [ ] Multi-region deployment and scaling

## 🏆 Key Achievements

### 🎯 What Makes Cliently Special

- **🏗️ Solid Foundation**: Built on modern, production-ready technologies with enterprise-grade architecture
- **🔒 Security-First**: Comprehensive audit logging, role-based access control, and security best practices
- **📱 Mobile-Optimized**: Responsive design with mobile-first approach and touch-friendly interfaces
- **⚡ Performance**: Next.js 15 with Turbopack for lightning-fast development and builds
- **🎨 Beautiful UI**: Modern design system with shadcn/ui and Radix UI primitives
- **🔧 Developer Experience**: TypeScript, Biome linting, and comprehensive tooling
- **📊 Data-Driven**: Interactive dashboards and analytics with Recharts
- **🌐 Multi-tenant**: Scalable architecture supporting multiple organizations
- **📧 Email Integration**: Professional email templates with Resend
- **📋 Comprehensive Documentation**: Detailed system algorithms and architecture blueprints

### 🚀 Ready for Production

Cliently is architected for scale with:

- **Multi-tenant SaaS architecture** with organization-based data isolation
- **Comprehensive audit trail** for compliance and security
- **Modern authentication** with Better Auth and social providers
- **Type-safe database** operations with Prisma ORM
- **Responsive design** that works on all devices
- **Professional email** system with branded templates

---

Built with ❤️ using Next.js 15, Better Auth, Prisma, and shadcn/ui
