import "server-only";

import { getServerSession } from "@/lib/authentication/middleware";
import { prisma } from "@/lib/db/config";

export const getOrganizations = async () => {
  const session = await getServerSession();

  if (!session) {
    return [];
  }

  const organizations = await prisma.organization.findMany({
    where: {
      members: {
        some: {
          userId: session?.user.id,
        },
      },
    },
    include: {
      members: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });
  return organizations;
};
