# Database Seed Data

This seed file creates realistic sample data for testing and development of the client management SaaS platform.

## What Gets Created

### 🏢 Organization

- **Demo Organization** - A test organization for development

### 👤 User

- **Email**: demo@example.com
- **Password**: password123
- **Role**: Admin

### 👥 Clients (10 total)

1. **Acme Corporation** - Technology company (Active, High Priority)
2. **TechStart Inc** - Healthcare AI startup (Prospect, Medium Priority)
3. **Global Marketing Solutions** - Digital marketing agency (Active, Medium Priority)
4. **Fashion Forward Boutique** - Retail fashion store (Lead, Low Priority)
5. **MedTech Innovations** - Medical technology company (Active, Critical Priority)
6. **Green Energy Solutions** - Renewable energy company (Prospect, Medium Priority)
7. **Creative Design Studio** - Boutique design agency (Active, Medium Priority)
8. **Financial Advisory Group** - Financial services (Inactive, Low Priority)
9. **EduTech Learning** - Educational technology (Active, High Priority)
10. **Logistics Pro** - Third-party logistics (Prospect, Medium Priority)

### 📞 Client Contacts (25 total)

Each client has 1-3 contacts with realistic roles:

- **Primary Contacts**: CEOs, Founders, Managing Directors
- **Secondary Contacts**: CTOs, VPs, Managers, Coordinators
- **Departments**: Executive, Technology, Sales, Operations, Creative, etc.
- **Timezones**: Various US timezones (EST, PST, CST, MST)
- **Contact Methods**: Email, Phone, SMS preferences

### 📊 Sample Data Features

- **Realistic Industries**: Technology, Healthcare, Marketing, Retail, Energy, etc.
- **Company Sizes**: From 1-10 employees to 201-500+ employees
- **Revenue Ranges**: From $0-100k to $10M+
- **Status Distribution**: Active, Prospect, Lead, Inactive clients
- **Priority Levels**: Low, Medium, High, Critical
- **Source Tracking**: Referral, Website, Social, Cold Call, Other
- **Tags**: Industry-specific and business-relevant tags
- **Contact History**: Recent last contact dates (1 day to 1 month ago)

## Running the Seed

```bash
# Install dependencies (if not already installed)
npm install

# Run the seed script
npm run db:seed
```

## Demo Credentials

After seeding, you can log in with:

- **Email**: demo@example.com
- **Password**: password123

## Data Structure

The seed data demonstrates:

- **Multi-tenant architecture** with organization isolation
- **Client-contact relationships** with primary contact designation
- **Realistic business scenarios** for service businesses
- **Comprehensive contact information** with preferences
- **Audit logging** for compliance and tracking
- **Status and priority management** for client classification

This provides a solid foundation for testing all client management features including CRUD operations, contact management, filtering, search, and analytics.
