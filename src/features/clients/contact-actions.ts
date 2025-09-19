"use server";

import { getServerSession } from "@/lib/authentication/middleware";
import {
  createContactSchema,
  updateContactSchema,
  CreateContactSchema,
  UpdateContactSchema,
} from "./contact.schema";
import { prisma } from "@/lib/db/config";
import { createAuditLog } from "../audit/actions";

export const createContact = async (
  data: CreateContactSchema,
  clientId: string,
  organizationId: string
) => {
  try {
    const { success, error } = createContactSchema.safeParse(data);

    if (!success) {
      return { success: false, error: error.message };
    }

    const session = await getServerSession();

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    // If setting as primary, unset other primary contacts for this client
    if (data.isPrimary) {
      await prisma.clientContact.updateMany({
        where: {
          clientId,
          organizationId,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    const contact = await prisma.clientContact.create({
      data: {
        ...data,
        client: {
          connect: {
            id: clientId,
          },
        },
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });

    if (!contact) {
      return { success: false, error: "Contact not created" };
    }

    await createAuditLog({
      action: "create",
      resource: "client_contact",
      resourceId: contact.id,
      organizationId,
      message: "Contact created successfully",
      metadata: contact,
      status: "success",
    });

    return { success: true, message: "Contact created successfully" };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

export const updateContact = async (
  data: UpdateContactSchema,
  contactId: string,
  organizationId: string
) => {
  try {
    const { success, error } = updateContactSchema.safeParse(data);

    if (!success) {
      return { success: false, error: error.message };
    }

    const session = await getServerSession();

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    // If setting as primary, unset other primary contacts for this client
    if (data.isPrimary) {
      const contact = await prisma.clientContact.findUnique({
        where: { id: contactId },
        select: { clientId: true },
      });

      if (contact) {
        await prisma.clientContact.updateMany({
          where: {
            clientId: contact.clientId,
            organizationId,
            isPrimary: true,
            id: { not: contactId },
          },
          data: {
            isPrimary: false,
          },
        });
      }
    }

    const updatedContact = await prisma.clientContact.update({
      where: { id: contactId, organizationId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        department: data.department,
        isPrimary: data.isPrimary,
        preferredContactMethod: data.preferredContactMethod,
        timezone: data.timezone,
        isActive: data.isActive,
      },
    });

    if (!updatedContact) {
      return { success: false, error: "Contact not updated" };
    }

    await createAuditLog({
      action: "update",
      resource: "client_contact",
      resourceId: contactId,
      organizationId,
      message: "Contact updated successfully",
      metadata: updatedContact,
      status: "success",
    });

    return { success: true, message: "Contact updated successfully" };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

export const deleteContact = async (
  contactId: string,
  organizationId: string
) => {
  try {
    const session = await getServerSession();

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const contact = await prisma.clientContact.findUnique({
      where: { id: contactId, organizationId },
    });

    if (!contact) {
      return { success: false, error: "Contact not found" };
    }

    await prisma.clientContact.delete({
      where: { id: contactId, organizationId },
    });

    await createAuditLog({
      action: "delete",
      resource: "client_contact",
      resourceId: contactId,
      organizationId,
      message: "Contact deleted successfully",
      metadata: contact,
      status: "success",
    });

    return { success: true, message: "Contact deleted successfully" };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

export const setPrimaryContact = async (
  contactId: string,
  organizationId: string
) => {
  try {
    const session = await getServerSession();

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const contact = await prisma.clientContact.findUnique({
      where: { id: contactId, organizationId },
      select: { clientId: true },
    });

    if (!contact) {
      return { success: false, error: "Contact not found" };
    }

    // Unset all primary contacts for this client
    await prisma.clientContact.updateMany({
      where: {
        clientId: contact.clientId,
        organizationId,
        isPrimary: true,
      },
      data: {
        isPrimary: false,
      },
    });

    // Set the selected contact as primary
    await prisma.clientContact.update({
      where: { id: contactId, organizationId },
      data: {
        isPrimary: true,
      },
    });

    await createAuditLog({
      action: "update",
      resource: "client_contact",
      resourceId: contactId,
      organizationId,
      message: "Contact set as primary",
      status: "success",
    });

    return { success: true, message: "Primary contact updated successfully" };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};
