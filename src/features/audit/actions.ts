"use server";

import { getServerSession } from "@/lib/authentication/middleware";
import { prisma } from "@/lib/db/config";

interface CreateAuditLogProps {
  action: string;
  resource?: string;
  resourceId?: string;
  status?: string;
  metadata?: any;
  organizationId?: string;
  message?: string;
}

export const createAuditLog = async ({
  action,
  resource,
  resourceId,
  status = "success",
  metadata,
  message,
  organizationId,
}: CreateAuditLogProps) => {
  const session = await getServerSession();

  const metadataString = metadata ? JSON.stringify(metadata) : null;

  try {
    await prisma.auditLog.create({
      data: {
        action,
        resource: resource || null,
        resourceId: resourceId || null,
        status,
        userId: session?.user.id || null,
        metadata: metadataString,
        message: message || null,
        organizationId: organizationId || null,
        ipAddress: session?.session.ipAddress || null,
        userAgent: session?.session.userAgent || null,
        sessionId: session?.session.id || null,
      },
    });
    return {
      success: true,
      message: "Audit log created successfully",
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
