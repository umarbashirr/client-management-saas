"use server";

import { getServerSession } from "@/lib/authentication/middleware";
import {
  createWorkspaceSchema,
  CreateWorkspaceSchema,
} from "../validations/create-workspace.schema";
import { auth } from "@/lib/authentication/auth";
import { headers } from "next/headers";
import { createAuditLog } from "@/features/audit/actions";

export const createWorkspace = async (data: CreateWorkspaceSchema) => {
  try {
    const { success, error } = createWorkspaceSchema.safeParse(data);

    if (!success) {
      return { success: false, error: error.message };
    }

    const { name, slug } = data;

    const session = await getServerSession();

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const workspace = await auth.api.createOrganization({
      body: {
        name,
        slug,
        logo: "",
      },
      headers: await headers(),
    });

    if (!workspace) {
      return { success: false, error: "Failed to create workspace" };
    }

    await createAuditLog({
      action: "workspace.create",
      resource: "workspace",
      resourceId: workspace.id,
      organizationId: workspace.id,
      message: "Workspace created successfully",
      metadata: workspace,
      status: "success",
    });

    return { success: true, message: "Workspace created successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

export const selectWorkspace = async (id: string) => {
  try {
    const session = await getServerSession();

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    await auth.api.setActiveOrganization({
      body: {
        organizationId: id,
      },
      headers: await headers(),
    });

    return { success: true, message: "Workspace selected successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};
