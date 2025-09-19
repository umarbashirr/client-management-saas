import { PrismaClient } from "@/lib/db/generated/prisma";

const prisma = new PrismaClient();

// Sample data for realistic client management scenarios
const sampleClients = [
  {
    name: "Acme Corporation",
    companyName: "Acme Corporation",
    website: "https://acme.com",
    description:
      "Leading technology company specializing in enterprise software solutions and cloud infrastructure.",
    primaryEmail: "contact@acme.com",
    primaryPhone: "+1 (555) 123-4567",
    industry: "Technology",
    companySize: "201-500",
    annualRevenue: "10m+",
    status: "active",
    priority: "high",
    source: "referral",
    tags: ["enterprise", "tech", "high-value", "long-term"],
    lastContactAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    name: "TechStart Inc",
    companyName: "TechStart Inc",
    website: "https://techstart.io",
    description:
      "Innovative startup developing AI-powered mobile applications for the healthcare industry.",
    primaryEmail: "hello@techstart.io",
    primaryPhone: "+1 (555) 987-6543",
    industry: "Healthcare Technology",
    companySize: "11-50",
    annualRevenue: "100k-1m",
    status: "prospect",
    priority: "medium",
    source: "website",
    tags: ["startup", "healthcare", "ai", "mobile"],
    lastContactAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    name: "Global Marketing Solutions",
    companyName: "Global Marketing Solutions",
    website: "https://globalmarketing.com",
    description:
      "Full-service digital marketing agency providing SEO, PPC, and social media management services.",
    primaryEmail: "info@globalmarketing.com",
    primaryPhone: "+1 (555) 456-7890",
    industry: "Marketing & Advertising",
    companySize: "51-200",
    annualRevenue: "1m-10m",
    status: "active",
    priority: "medium",
    source: "social",
    tags: ["marketing", "agency", "digital", "seo"],
    lastContactAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    name: "Fashion Forward Boutique",
    companyName: "Fashion Forward Boutique",
    website: "https://fashionforward.com",
    description:
      "Trendy fashion boutique offering contemporary clothing and accessories for young professionals.",
    primaryEmail: "orders@fashionforward.com",
    primaryPhone: "+1 (555) 321-0987",
    industry: "Retail & E-commerce",
    companySize: "1-10",
    annualRevenue: "0-100k",
    status: "lead",
    priority: "low",
    source: "cold_call",
    tags: ["retail", "fashion", "ecommerce", "small-business"],
    lastContactAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
  },
  {
    name: "MedTech Innovations",
    companyName: "MedTech Innovations",
    website: "https://medtechinnovations.com",
    description:
      "Medical technology company developing cutting-edge diagnostic equipment and software solutions.",
    primaryEmail: "contact@medtechinnovations.com",
    primaryPhone: "+1 (555) 654-3210",
    industry: "Medical Technology",
    companySize: "201-500",
    annualRevenue: "10m+",
    status: "active",
    priority: "critical",
    source: "referral",
    tags: ["medical", "technology", "healthcare", "enterprise"],
    lastContactAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    name: "Green Energy Solutions",
    companyName: "Green Energy Solutions",
    website: "https://greenenergy.com",
    description:
      "Renewable energy company specializing in solar panel installation and energy storage solutions.",
    primaryEmail: "info@greenenergy.com",
    primaryPhone: "+1 (555) 789-0123",
    industry: "Renewable Energy",
    companySize: "51-200",
    annualRevenue: "1m-10m",
    status: "prospect",
    priority: "medium",
    source: "website",
    tags: ["energy", "solar", "renewable", "sustainability"],
    lastContactAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    name: "Creative Design Studio",
    companyName: "Creative Design Studio",
    website: "https://creativedesign.studio",
    description:
      "Boutique design agency offering branding, web design, and graphic design services for small businesses.",
    primaryEmail: "hello@creativedesign.studio",
    primaryPhone: "+1 (555) 246-8135",
    industry: "Creative Services",
    companySize: "1-10",
    annualRevenue: "100k-1m",
    status: "active",
    priority: "medium",
    source: "referral",
    tags: ["design", "creative", "branding", "small-business"],
    lastContactAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    name: "Financial Advisory Group",
    companyName: "Financial Advisory Group",
    website: "https://financialadvisory.com",
    description:
      "Professional financial advisory firm providing investment management and financial planning services.",
    primaryEmail: "contact@financialadvisory.com",
    primaryPhone: "+1 (555) 135-7924",
    industry: "Financial Services",
    companySize: "11-50",
    annualRevenue: "1m-10m",
    status: "inactive",
    priority: "low",
    source: "other",
    tags: ["finance", "advisory", "investment", "professional"],
    lastContactAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
  },
  {
    name: "EduTech Learning",
    companyName: "EduTech Learning",
    website: "https://edutechlearning.com",
    description:
      "Educational technology company creating interactive learning platforms and online courses.",
    primaryEmail: "support@edutechlearning.com",
    primaryPhone: "+1 (555) 369-2580",
    industry: "Education Technology",
    companySize: "51-200",
    annualRevenue: "1m-10m",
    status: "active",
    priority: "high",
    source: "social",
    tags: ["education", "technology", "learning", "online"],
    lastContactAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
  },
  {
    name: "Logistics Pro",
    companyName: "Logistics Pro",
    website: "https://logisticspro.com",
    description:
      "Third-party logistics provider offering warehousing, transportation, and supply chain management services.",
    primaryEmail: "operations@logisticspro.com",
    primaryPhone: "+1 (555) 802-4681",
    industry: "Logistics & Transportation",
    companySize: "201-500",
    annualRevenue: "10m+",
    status: "prospect",
    priority: "medium",
    source: "cold_call",
    tags: ["logistics", "transportation", "warehousing", "supply-chain"],
    lastContactAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  },
];

// Sample contacts for each client
const sampleContacts = [
  // Acme Corporation contacts
  {
    clientIndex: 0,
    contacts: [
      {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@acme.com",
        phone: "+1 (555) 123-4567",
        position: "CEO",
        department: "Executive",
        isPrimary: true,
        preferredContactMethod: "email",
        timezone: "America/New_York",
        isActive: true,
      },
      {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@acme.com",
        phone: "+1 (555) 123-4568",
        position: "CTO",
        department: "Technology",
        isPrimary: false,
        preferredContactMethod: "phone",
        timezone: "America/New_York",
        isActive: true,
      },
      {
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@acme.com",
        phone: "+1 (555) 123-4569",
        position: "Project Manager",
        department: "Operations",
        isPrimary: false,
        preferredContactMethod: "email",
        timezone: "America/New_York",
        isActive: true,
      },
    ],
  },
  // TechStart Inc contacts
  {
    clientIndex: 1,
    contacts: [
      {
        firstName: "Alex",
        lastName: "Chen",
        email: "alex@techstart.io",
        phone: "+1 (555) 987-6543",
        position: "Founder & CEO",
        department: "Executive",
        isPrimary: true,
        preferredContactMethod: "email",
        timezone: "America/Los_Angeles",
        isActive: true,
      },
      {
        firstName: "Emma",
        lastName: "Davis",
        email: "emma@techstart.io",
        phone: "+1 (555) 987-6544",
        position: "Head of Product",
        department: "Product",
        isPrimary: false,
        preferredContactMethod: "phone",
        timezone: "America/Los_Angeles",
        isActive: true,
      },
    ],
  },
  // Global Marketing Solutions contacts
  {
    clientIndex: 2,
    contacts: [
      {
        firstName: "David",
        lastName: "Wilson",
        email: "david@globalmarketing.com",
        phone: "+1 (555) 456-7890",
        position: "Managing Director",
        department: "Executive",
        isPrimary: true,
        preferredContactMethod: "email",
        timezone: "America/Chicago",
        isActive: true,
      },
      {
        firstName: "Lisa",
        lastName: "Garcia",
        email: "lisa@globalmarketing.com",
        phone: "+1 (555) 456-7891",
        position: "Account Director",
        department: "Client Services",
        isPrimary: false,
        preferredContactMethod: "email",
        timezone: "America/Chicago",
        isActive: true,
      },
      {
        firstName: "Robert",
        lastName: "Martinez",
        email: "robert@globalmarketing.com",
        phone: "+1 (555) 456-7892",
        position: "Creative Director",
        department: "Creative",
        isPrimary: false,
        preferredContactMethod: "phone",
        timezone: "America/Chicago",
        isActive: true,
      },
    ],
  },
  // Fashion Forward Boutique contacts
  {
    clientIndex: 3,
    contacts: [
      {
        firstName: "Jessica",
        lastName: "Taylor",
        email: "jessica@fashionforward.com",
        phone: "+1 (555) 321-0987",
        position: "Owner",
        department: "Management",
        isPrimary: true,
        preferredContactMethod: "phone",
        timezone: "America/New_York",
        isActive: true,
      },
    ],
  },
  // MedTech Innovations contacts
  {
    clientIndex: 4,
    contacts: [
      {
        firstName: "Dr. James",
        lastName: "Anderson",
        email: "james.anderson@medtechinnovations.com",
        phone: "+1 (555) 654-3210",
        position: "Chief Medical Officer",
        department: "Medical",
        isPrimary: true,
        preferredContactMethod: "email",
        timezone: "America/New_York",
        isActive: true,
      },
      {
        firstName: "Jennifer",
        lastName: "Lee",
        email: "jennifer.lee@medtechinnovations.com",
        phone: "+1 (555) 654-3211",
        position: "VP of Engineering",
        department: "Engineering",
        isPrimary: false,
        preferredContactMethod: "email",
        timezone: "America/New_York",
        isActive: true,
      },
      {
        firstName: "Mark",
        lastName: "Thompson",
        email: "mark.thompson@medtechinnovations.com",
        phone: "+1 (555) 654-3212",
        position: "Procurement Manager",
        department: "Procurement",
        isPrimary: false,
        preferredContactMethod: "phone",
        timezone: "America/New_York",
        isActive: true,
      },
    ],
  },
  // Green Energy Solutions contacts
  {
    clientIndex: 5,
    contacts: [
      {
        firstName: "Rachel",
        lastName: "Green",
        email: "rachel@greenenergy.com",
        phone: "+1 (555) 789-0123",
        position: "Business Development Manager",
        department: "Sales",
        isPrimary: true,
        preferredContactMethod: "email",
        timezone: "America/Denver",
        isActive: true,
      },
      {
        firstName: "Tom",
        lastName: "Wilson",
        email: "tom@greenenergy.com",
        phone: "+1 (555) 789-0124",
        position: "Project Coordinator",
        department: "Operations",
        isPrimary: false,
        preferredContactMethod: "phone",
        timezone: "America/Denver",
        isActive: true,
      },
    ],
  },
  // Creative Design Studio contacts
  {
    clientIndex: 6,
    contacts: [
      {
        firstName: "Sophie",
        lastName: "Miller",
        email: "sophie@creativedesign.studio",
        phone: "+1 (555) 246-8135",
        position: "Creative Director",
        department: "Creative",
        isPrimary: true,
        preferredContactMethod: "email",
        timezone: "America/Los_Angeles",
        isActive: true,
      },
      {
        firstName: "Chris",
        lastName: "Rodriguez",
        email: "chris@creativedesign.studio",
        phone: "+1 (555) 246-8136",
        position: "Account Manager",
        department: "Client Services",
        isPrimary: false,
        preferredContactMethod: "email",
        timezone: "America/Los_Angeles",
        isActive: true,
      },
    ],
  },
  // Financial Advisory Group contacts
  {
    clientIndex: 7,
    contacts: [
      {
        firstName: "William",
        lastName: "Davis",
        email: "william@financialadvisory.com",
        phone: "+1 (555) 135-7924",
        position: "Senior Partner",
        department: "Executive",
        isPrimary: true,
        preferredContactMethod: "phone",
        timezone: "America/New_York",
        isActive: false, // Inactive client
      },
    ],
  },
  // EduTech Learning contacts
  {
    clientIndex: 8,
    contacts: [
      {
        firstName: "Dr. Maria",
        lastName: "Gonzalez",
        email: "maria@edutechlearning.com",
        phone: "+1 (555) 369-2580",
        position: "Chief Learning Officer",
        department: "Education",
        isPrimary: true,
        preferredContactMethod: "email",
        timezone: "America/Chicago",
        isActive: true,
      },
      {
        firstName: "Kevin",
        lastName: "Park",
        email: "kevin@edutechlearning.com",
        phone: "+1 (555) 369-2581",
        position: "Head of Technology",
        department: "Technology",
        isPrimary: false,
        preferredContactMethod: "email",
        timezone: "America/Chicago",
        isActive: true,
      },
      {
        firstName: "Amanda",
        lastName: "White",
        email: "amanda@edutechlearning.com",
        phone: "+1 (555) 369-2582",
        position: "Content Manager",
        department: "Content",
        isPrimary: false,
        preferredContactMethod: "phone",
        timezone: "America/Chicago",
        isActive: true,
      },
    ],
  },
  // Logistics Pro contacts
  {
    clientIndex: 9,
    contacts: [
      {
        firstName: "Steve",
        lastName: "Johnson",
        email: "steve@logisticspro.com",
        phone: "+1 (555) 802-4681",
        position: "Operations Director",
        department: "Operations",
        isPrimary: true,
        preferredContactMethod: "phone",
        timezone: "America/Chicago",
        isActive: true,
      },
      {
        firstName: "Nancy",
        lastName: "Clark",
        email: "nancy@logisticspro.com",
        phone: "+1 (555) 802-4682",
        position: "Sales Manager",
        department: "Sales",
        isPrimary: false,
        preferredContactMethod: "email",
        timezone: "America/Chicago",
        isActive: true,
      },
    ],
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  // Use existing Better Auth organization and user IDs
  const organizationId = "MTEnnoPCuK90Jva5npifUexQQPoH2QBQ";
  const userId = "GdXKbwYHGgzjtwuLNNu3TsPtw37aBJ97";
  const memberId = "Fkqmp9lzL9QCYOO5ZE3Jy4ZKG0ZvPUbL";

  console.log("✅ Using existing organization and user from Better Auth");

  // Create clients
  const createdClients = [];
  for (const clientData of sampleClients) {
    const client = await prisma.client.create({
      data: {
        ...clientData,
        organizationId: organizationId,
      },
    });
    createdClients.push(client);
    console.log(`✅ Created client: ${client.name}`);
  }

  // Create contacts for each client
  for (const contactGroup of sampleContacts) {
    const client = createdClients[contactGroup.clientIndex];

    for (const contactData of contactGroup.contacts) {
      await prisma.clientContact.create({
        data: {
          ...contactData,
          clientId: client.id,
          organizationId: organizationId,
        },
      });
      console.log(
        `✅ Created contact: ${contactData.firstName} ${contactData.lastName} for ${client.name}`
      );
    }
  }

  // Create some audit logs for demonstration
  const auditLogs = [
    {
      userId: userId,
      action: "client.create",
      resource: "client",
      resourceId: createdClients[0].id,
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      message: "Client created successfully",
      metadata: JSON.stringify({ clientName: createdClients[0].name }),
      organizationId: organizationId,
    },
    {
      userId: userId,
      action: "client.contact.create",
      resource: "client_contact",
      resourceId: "contact-1",
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      message: "Client contact created successfully",
      metadata: JSON.stringify({ contactName: "John Smith" }),
      organizationId: organizationId,
    },
    {
      userId: userId,
      action: "user.signin",
      resource: "user",
      resourceId: userId,
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      message: "User signed in successfully",
      organizationId: organizationId,
    },
  ];

  for (const logData of auditLogs) {
    await prisma.auditLog.create({
      data: logData,
    });
  }

  console.log("✅ Created audit logs");

  console.log("\n🎉 Database seeding completed successfully!");
  console.log(`📊 Created:`);
  console.log(`   - ${createdClients.length} clients`);
  console.log(
    `   - ${sampleContacts.reduce((total, group) => total + group.contacts.length, 0)} contacts`
  );
  console.log(`   - ${auditLogs.length} audit logs`);

  console.log("\n✅ Using existing Better Auth organization and user");
  console.log(`   Organization ID: ${organizationId}`);
  console.log(`   User ID: ${userId}`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
