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
