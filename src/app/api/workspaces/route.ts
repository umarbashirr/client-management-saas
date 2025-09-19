import { createAuditLog } from "@/features/audit/actions";
import { createWorkspaceSchema } from "@/features/workspace/validations/create-workspace.schema";
import { auth } from "@/lib/authentication/auth";
import { getServerSession } from "@/lib/authentication/middleware";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { success, error } = createWorkspaceSchema.safeParse(body);

    if (!success) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const { name, slug } = body;

    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workspace = await auth.api.createOrganization({
      body: {
        name,
        slug,
        logo: "",
        userId: session.user.id,
        keepCurrentActiveOrganization: false,
      },

      headers: await headers(),
    });

    if (!workspace) {
      return NextResponse.json(
        { error: "Failed to create workspace" },
        { status: 401 }
      );
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

    return NextResponse.json(
      { message: "Workspace created successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workspaces = await prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(workspaces, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
