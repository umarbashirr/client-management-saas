# Client Management SaaS

A comprehensive client management platform built with Next.js, featuring authentication, payment processing, and advanced client relationship management tools.

## 🚀 Features

### Core Functionality

- **Client Management**: Complete CRUD operations for client profiles
- **Project Tracking**: Manage projects, tasks, and deliverables
- **Invoice Management**: Create, send, and track invoices
- **Payment Processing**: Integrated payment gateway with DodoPayments
- **Subscription Management**: Handle recurring billing and subscriptions
- **Dashboard Analytics**: Real-time insights and reporting
- **Team Collaboration**: Multi-user support with role-based access

### Technical Features

- **Authentication**: Secure authentication with Better Auth
- **Modern UI**: Beautiful interface built with shadcn/ui
- **Type Safety**: Full TypeScript support
- **Database**: PostgreSQL with Prisma ORM
- **API Routes**: RESTful API with Next.js App Router
- **Server Actions**: Optimized data mutations
- **Responsive Design**: Mobile-first approach

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Authentication**: Better Auth
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payments**: DodoPayments
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts

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

# DodoPayments
DODO_PAYMENTS_API_KEY="your-dodo-payments-api-key"
DODO_PAYMENTS_ENVIRONMENT="test_mode" # or "live_mode"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

### 5. Initialize shadcn/ui

```bash
npx shadcn@latest init
```

### 6. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── charts/           # Chart components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── auth.ts           # Better Auth configuration
│   ├── db.ts             # Database connection
│   ├── validations.ts    # Zod schemas
│   └── utils.ts          # Utility functions
├── server/               # Server-side code
│   ├── actions/          # Server Actions
│   ├── db/               # Database schema & queries
│   └── services/         # Business logic
└── types/                # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run format` - Format code
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

## 🔐 Authentication

The application uses Better Auth for authentication with the following features:

- Email/password authentication
- Social login (Google, GitHub, etc.)
- Session management
- Password reset
- Email verification
- Role-based access control

## 💳 Payment Integration

DodoPayments integration provides:

- One-time payments
- Subscription billing
- Invoice generation
- Payment tracking
- Webhook handling
- Multiple payment methods

## 📊 Database Schema

### Core Tables

- `users` - User accounts and profiles
- `clients` - Client information
- `projects` - Project management
- `invoices` - Invoice records
- `payments` - Payment transactions
- `subscriptions` - Subscription plans
- `teams` - Team management

## 🎨 UI Components

Built with shadcn/ui, the application includes:

- Form components with validation
- Data tables with sorting/filtering
- Charts and analytics
- Modal dialogs
- Navigation components
- Responsive layouts

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

## 🔄 Roadmap

### Phase 1 (Current)

- [] Basic client management
- [] Authentication system
- [] Payment integration
- [] Dashboard

### Phase 2 (Next)

- [ ] Advanced analytics
- [ ] Mobile app
- [ ] API documentation
- [ ] Webhooks

### Phase 3 (Future)

- [ ] Multi-tenant support
- [ ] Advanced reporting
- [ ] Integrations
- [ ] White-label options

---

Built with ❤️ using Next.js, Better Auth, and DodoPayments
