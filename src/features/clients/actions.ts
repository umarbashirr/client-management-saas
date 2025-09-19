"use server";

import { getServerSession } from "@/lib/authentication/middleware";
import { createClientSchema, CreateClientSchema } from "./client.schema";
import {
  createContactSchema,
  updateContactSchema,
  CreateContactSchema,
  UpdateContactSchema,
} from "./contact.schema";
import { prisma } from "@/lib/db/config";
import { createAuditLog } from "../audit/actions";

export const createClient = async (
  data: CreateClientSchema,
  organizationId: string
) => {
  try {
    const { success, error } = createClientSchema.safeParse(data);

    if (!success) {
      return { success: false, error: error.message };
    }
    const {
      name,
      companyName,
      website,
      description,
      primaryEmail,
      primaryPhone,
      industry,
      companySize,
      annualRevenue,
      status,
      priority,
      source,
      tags,
    } = data;

    const session = await getServerSession();

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const client = await prisma.client.create({
      data: {
        name,
        companyName,
        website,
        description,
        primaryEmail,
        primaryPhone,
        industry,
        companySize,
        annualRevenue,
        status,
        priority,
        source,
        tags,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });

    if (!client) {
      return { success: false, error: "Client not created" };
    }

    await createAuditLog({
      action: "create",
      resource: "client",
      resourceId: client.id,
      organizationId,
      message: "Client created successfully",
      metadata: client,
      status: "success",
    });

    return { success: true, message: "Client created successfully" };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

export const updateClient = async (
  data: CreateClientSchema,
  clientId: string,
  organizationId: string
) => {
  try {
    const { success, error } = createClientSchema.safeParse(data);

    if (!success) {
      return { success: false, error: error.message };
    }

    const {
      name,
      annualRevenue,
      companyName,
      website,
      description,
      primaryEmail,
      primaryPhone,
      industry,
      companySize,
      status,
      priority,
      source,
      tags,
    } = data;

    const session = await getServerSession();

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    // Check if client exists and is not soft-deleted
    const existingClient = await prisma.client.findFirst({
      where: {
        id: clientId,
        organizationId,
        deletedAt: null, // Only find non-deleted clients
      },
    });

    if (!existingClient) {
      return { success: false, error: "Client not found" };
    }

    const updatedClient = await prisma.client.update({
      where: { id: clientId, organizationId },
      data: {
        name,
        annualRevenue,
        companyName,
        website,
        description,
        primaryEmail,
        primaryPhone,
        industry,
        companySize,
        status,
        priority,
        source,
        tags,
      },
    });

    if (!updatedClient) {
      return { success: false, error: "Client not updated" };
    }

    await createAuditLog({
      action: "update",
      resource: "client",
      resourceId: clientId,
      organizationId,
      message: "Client updated successfully",
      metadata: updatedClient,
      status: "success",
    });

    return { success: true, message: "Client updated successfully" };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

export const deleteClient = async (
  clientId: string,
  organizationId: string,
  deleteReason?: string
) => {
  try {
    const session = await getServerSession();

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    // Check if client exists and belongs to organization
    const existingClient = await prisma.client.findFirst({
      where: {
        id: clientId,
        organizationId,
        deletedAt: null, // Only find non-deleted clients
      },
    });

    if (!existingClient) {
      return { success: false, error: "Client not found" };
    }

    // Soft delete the client
    const deletedClient = await prisma.client.update({
      where: { id: clientId, organizationId },
      data: {
        deletedAt: new Date(),
        deletedBy: session.user.id,
        deleteReason: deleteReason || null,
      },
    });

    if (!deletedClient) {
      return { success: false, error: "Client not deleted" };
    }

    // Soft delete all related contacts
    await prisma.clientContact.updateMany({
      where: {
        clientId,
        organizationId,
        isActive: true, // Only delete active contacts
      },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
    });

    await createAuditLog({
      action: "delete",
      resource: "client",
      resourceId: clientId,
      organizationId,
      message: "Client deleted successfully",
      metadata: {
        clientName: existingClient.name,
        deleteReason: deleteReason,
        deletedBy: session.user.id,
        deletedAt: new Date().toISOString(),
      },
      status: "success",
    });

    return { success: true, message: "Client deleted successfully" };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};
