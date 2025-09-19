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
    },
    include: {
      contacts: true,
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
    },
    include: {
      contacts: true,
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
    },
    include: {
      contacts: true,
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
    },
    include: {
      contacts: true,
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
      contacts: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return clients;
};
