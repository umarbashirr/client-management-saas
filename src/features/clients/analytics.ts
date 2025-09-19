import "server-only";

import { prisma } from "@/lib/db/config";
import { ClientWithContacts } from "./types";

// Client Overview Metrics and KPIs
export interface ClientOverviewMetrics {
  totalClients: number;
  activeClients: number;
  newClientsThisMonth: number;
  clientsAddedLastMonth: number;
  averageContactsPerClient: number;
  clientsWithNoContacts: number;
  clientsWithHighPriority: number;
  clientsWithCriticalPriority: number;
}

export const getClientOverviewMetrics = async (
  organizationId: string
): Promise<ClientOverviewMetrics> => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const [
    totalClients,
    activeClients,
    newClientsThisMonth,
    clientsAddedLastMonth,
    clientsWithContacts,
    clientsWithNoContacts,
    clientsWithHighPriority,
    clientsWithCriticalPriority,
  ] = await Promise.all([
    // Total clients
    prisma.client.count({
      where: {
        organizationId,
        deletedAt: null,
      },
    }),
    // Active clients
    prisma.client.count({
      where: {
        organizationId,
        deletedAt: null,
        status: "active",
      },
    }),
    // New clients this month
    prisma.client.count({
      where: {
        organizationId,
        deletedAt: null,
        createdAt: {
          gte: startOfMonth,
        },
      },
    }),
    // Clients added last month
    prisma.client.count({
      where: {
        organizationId,
        deletedAt: null,
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    }),
    // Clients with contacts
    prisma.client.count({
      where: {
        organizationId,
        deletedAt: null,
        contacts: {
          some: {
            isActive: true,
          },
        },
      },
    }),
    // Clients with no contacts
    prisma.client.count({
      where: {
        organizationId,
        deletedAt: null,
        contacts: {
          none: {
            isActive: true,
          },
        },
      },
    }),
    // High priority clients
    prisma.client.count({
      where: {
        organizationId,
        deletedAt: null,
        priority: "high",
      },
    }),
    // Critical priority clients
    prisma.client.count({
      where: {
        organizationId,
        deletedAt: null,
        priority: "critical",
      },
    }),
  ]);

  // Calculate average contacts per client
  const totalContacts = await prisma.clientContact.count({
    where: {
      organizationId,
      isActive: true,
      client: {
        deletedAt: null,
      },
    },
  });

  const averageContactsPerClient =
    totalClients > 0 ? totalContacts / totalClients : 0;

  return {
    totalClients,
    activeClients,
    newClientsThisMonth,
    clientsAddedLastMonth,
    averageContactsPerClient: Math.round(averageContactsPerClient * 10) / 10,
    clientsWithNoContacts,
    clientsWithHighPriority,
    clientsWithCriticalPriority,
  };
};

// Status and Priority Distribution
export interface StatusDistribution {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

export interface PriorityDistribution {
  priority: string;
  count: number;
  percentage: number;
  color: string;
}

export const getStatusDistribution = async (
  organizationId: string
): Promise<StatusDistribution[]> => {
  const statusCounts = await prisma.client.groupBy({
    by: ["status"],
    where: {
      organizationId,
      deletedAt: null,
    },
    _count: {
      status: true,
    },
  });

  const total = statusCounts.reduce((sum, item) => sum + item._count.status, 0);

  const statusColors: Record<string, string> = {
    active: "bg-green-500",
    inactive: "bg-gray-500",
    prospect: "bg-blue-500",
    lead: "bg-yellow-500",
  };

  return statusCounts.map((item) => ({
    status: item.status,
    count: item._count.status,
    percentage: total > 0 ? Math.round((item._count.status / total) * 100) : 0,
    color: statusColors[item.status] || "bg-gray-500",
  }));
};

export const getPriorityDistribution = async (
  organizationId: string
): Promise<PriorityDistribution[]> => {
  const priorityCounts = await prisma.client.groupBy({
    by: ["priority"],
    where: {
      organizationId,
      deletedAt: null,
    },
    _count: {
      priority: true,
    },
  });

  const total = priorityCounts.reduce(
    (sum, item) => sum + item._count.priority,
    0
  );

  const priorityColors: Record<string, string> = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-orange-500",
    critical: "bg-red-500",
  };

  return priorityCounts.map((item) => ({
    priority: item.priority,
    count: item._count.priority,
    percentage:
      total > 0 ? Math.round((item._count.priority / total) * 100) : 0,
    color: priorityColors[item.priority] || "bg-gray-500",
  }));
};

// Client Growth Trends
export interface ClientGrowthData {
  month: string;
  newClients: number;
  totalClients: number;
  growthRate: number;
}

export const getClientGrowthTrends = async (
  organizationId: string,
  months: number = 12
): Promise<ClientGrowthData[]> => {
  const now = new Date();
  const data: ClientGrowthData[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const monthLabel = monthStart.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });

    const [newClients, totalClients] = await Promise.all([
      prisma.client.count({
        where: {
          organizationId,
          deletedAt: null,
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
      prisma.client.count({
        where: {
          organizationId,
          deletedAt: null,
          createdAt: {
            lte: monthEnd,
          },
        },
      }),
    ]);

    const previousMonthTotal =
      i === months - 1 ? 0 : data[data.length - 1]?.totalClients || 0;

    const growthRate =
      previousMonthTotal > 0
        ? Math.round(
            ((totalClients - previousMonthTotal) / previousMonthTotal) * 100
          )
        : 0;

    data.push({
      month: monthLabel,
      newClients,
      totalClients,
      growthRate,
    });
  }

  return data;
};

// Industry Analysis
export interface IndustryAnalysis {
  industry: string;
  count: number;
  percentage: number;
  averageContacts: number;
  topStatus: string;
  topPriority: string;
}

export const getIndustryAnalysis = async (
  organizationId: string
): Promise<IndustryAnalysis[]> => {
  const industryData = await prisma.client.groupBy({
    by: ["industry"],
    where: {
      organizationId,
      deletedAt: null,
      industry: {
        not: null,
      },
    },
    _count: {
      industry: true,
    },
    // We'll calculate average contacts separately
  });

  const total = industryData.reduce(
    (sum, item) => sum + item._count.industry,
    0
  );

  const analysis = await Promise.all(
    industryData.map(async (item) => {
      if (!item.industry) return null;

      // Get average contacts for this industry
      const clientsInIndustry = await prisma.client.findMany({
        where: {
          organizationId,
          deletedAt: null,
          industry: item.industry,
        },
        include: {
          contacts: {
            where: {
              isActive: true,
            },
          },
        },
      });

      const totalContacts = clientsInIndustry.reduce(
        (sum, client) => sum + client.contacts.length,
        0
      );
      const averageContacts =
        clientsInIndustry.length > 0
          ? totalContacts / clientsInIndustry.length
          : 0;

      // Get most common status and priority
      const statusCounts = await prisma.client.groupBy({
        by: ["status"],
        where: {
          organizationId,
          deletedAt: null,
          industry: item.industry,
        },
        _count: {
          status: true,
        },
        orderBy: {
          _count: {
            status: "desc",
          },
        },
        take: 1,
      });

      const priorityCounts = await prisma.client.groupBy({
        by: ["priority"],
        where: {
          organizationId,
          deletedAt: null,
          industry: item.industry,
        },
        _count: {
          priority: true,
        },
        orderBy: {
          _count: {
            priority: "desc",
          },
        },
        take: 1,
      });

      return {
        industry: item.industry,
        count: item._count.industry,
        percentage:
          total > 0 ? Math.round((item._count.industry / total) * 100) : 0,
        averageContacts: Math.round(averageContacts * 10) / 10,
        topStatus: statusCounts[0]?.status || "unknown",
        topPriority: priorityCounts[0]?.priority || "unknown",
      };
    })
  );

  return analysis.filter((item): item is IndustryAnalysis => item !== null);
};

// Contact Engagement Metrics
export interface ContactEngagementMetrics {
  totalContacts: number;
  activeContacts: number;
  primaryContacts: number;
  contactsWithEmail: number;
  contactsWithPhone: number;
  averageContactsPerClient: number;
  clientsWithMultipleContacts: number;
}

export const getContactEngagementMetrics = async (
  organizationId: string
): Promise<ContactEngagementMetrics> => {
  const [
    totalContacts,
    activeContacts,
    primaryContacts,
    contactsWithEmail,
    contactsWithPhone,
    clientsWithMultipleContacts,
  ] = await Promise.all([
    prisma.clientContact.count({
      where: {
        organizationId,
        client: {
          deletedAt: null,
        },
      },
    }),
    prisma.clientContact.count({
      where: {
        organizationId,
        isActive: true,
        client: {
          deletedAt: null,
        },
      },
    }),
    prisma.clientContact.count({
      where: {
        organizationId,
        isActive: true,
        isPrimary: true,
        client: {
          deletedAt: null,
        },
      },
    }),
    prisma.clientContact.count({
      where: {
        organizationId,
        isActive: true,
        email: {
          not: null,
        },
        client: {
          deletedAt: null,
        },
      },
    }),
    prisma.clientContact.count({
      where: {
        organizationId,
        isActive: true,
        phone: {
          not: null,
        },
        client: {
          deletedAt: null,
        },
      },
    }),
    prisma.client.count({
      where: {
        organizationId,
        deletedAt: null,
        contacts: {
          some: {
            isActive: true,
          },
        },
      },
    }),
  ]);

  const totalClients = await prisma.client.count({
    where: {
      organizationId,
      deletedAt: null,
    },
  });

  const averageContactsPerClient =
    totalClients > 0 ? activeContacts / totalClients : 0;

  return {
    totalContacts,
    activeContacts,
    primaryContacts,
    contactsWithEmail,
    contactsWithPhone,
    averageContactsPerClient: Math.round(averageContactsPerClient * 10) / 10,
    clientsWithMultipleContacts,
  };
};

// Client Health Scoring System
export interface ClientHealthScore {
  clientId: string;
  clientName: string;
  healthScore: number;
  factors: {
    hasContacts: boolean;
    hasRecentActivity: boolean;
    hasCompleteProfile: boolean;
    hasHighPriority: boolean;
    hasActiveStatus: boolean;
  };
  recommendations: string[];
}

export const getClientHealthScores = async (
  organizationId: string
): Promise<ClientHealthScore[]> => {
  const clients = await prisma.client.findMany({
    where: {
      organizationId,
      deletedAt: null,
    },
    include: {
      contacts: {
        where: {
          isActive: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  return clients.map((client) => {
    const factors = {
      hasContacts: client.contacts.length > 0,
      hasRecentActivity: client.lastContactAt
        ? client.lastContactAt >= thirtyDaysAgo
        : false,
      hasCompleteProfile: !!(
        client.companyName &&
        client.primaryEmail &&
        client.industry
      ),
      hasHighPriority:
        client.priority === "high" || client.priority === "critical",
      hasActiveStatus: client.status === "active",
    };

    let score = 0;
    const recommendations: string[] = [];

    // Calculate health score based on factors
    if (factors.hasContacts) score += 20;
    else recommendations.push("Add contact information");

    if (factors.hasRecentActivity) score += 20;
    else recommendations.push("Schedule follow-up contact");

    if (factors.hasCompleteProfile) score += 20;
    else recommendations.push("Complete client profile");

    if (factors.hasHighPriority) score += 20;
    else if (client.priority === "low")
      recommendations.push("Consider increasing priority");

    if (factors.hasActiveStatus) score += 20;
    else recommendations.push("Review client status");

    return {
      clientId: client.id,
      clientName: client.name,
      healthScore: score,
      factors,
      recommendations,
    };
  });
};
