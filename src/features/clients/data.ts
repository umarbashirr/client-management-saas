import "server-only";

import { prisma } from "@/lib/db/config";
import { Client, ClientContact } from "@/lib/db/generated/prisma";
import { ClientWithContacts } from "./types";

export const getClients = async (
  organizationId: string
): Promise<ClientWithContacts[]> => {
  const clients = await prisma.client.findMany({
    where: {
      organizationId,
      deletedAt: null, // Exclude soft-deleted clients
    },
    include: {
      contacts: {
        where: {
          isActive: true, // Only include active contacts
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return clients;
};

export const getClientById = async (
  id: string
): Promise<ClientWithContacts | null> => {
  const client = await prisma.client.findUnique({
    where: {
      id,
      deletedAt: null, // Exclude soft-deleted clients
    },
    include: {
      contacts: {
        where: {
          isActive: true, // Only include active contacts
        },
      },
    },
  });
  return client;
};

export const getClientsByStatus = async (
  organizationId: string,
  status: string
): Promise<ClientWithContacts[]> => {
  const clients = await prisma.client.findMany({
    where: {
      organizationId,
      status,
      deletedAt: null, // Exclude soft-deleted clients
    },
    include: {
      contacts: {
        where: {
          isActive: true, // Only include active contacts
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return clients;
};

export const getClientsByPriority = async (
  organizationId: string,
  priority: string
): Promise<ClientWithContacts[]> => {
  const clients = await prisma.client.findMany({
    where: {
      organizationId,
      priority,
      deletedAt: null, // Exclude soft-deleted clients
    },
    include: {
      contacts: {
        where: {
          isActive: true, // Only include active contacts
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return clients;
};

export const searchClients = async (
  organizationId: string,
  query: string
): Promise<ClientWithContacts[]> => {
  const clients = await prisma.client.findMany({
    where: {
      organizationId,
      deletedAt: null, // Exclude soft-deleted clients
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          companyName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          primaryEmail: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          industry: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      contacts: {
        where: {
          isActive: true, // Only include active contacts
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return clients;
};
