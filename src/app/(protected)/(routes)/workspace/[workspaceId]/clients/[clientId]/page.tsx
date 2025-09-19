import { ClientDetailView } from "@/features/clients/components/client-detail-view";
import { getClientById } from "@/features/clients/data";
import { getServerSession } from "@/lib/authentication/middleware";
import { notFound, redirect } from "next/navigation";

interface ClientDetailPageProps {
  params: Promise<{
    workspaceId: string;
    clientId: string;
  }>;
}

export default async function ClientDetailPage({
  params,
}: ClientDetailPageProps) {
  const session = await getServerSession();
  const { workspaceId, clientId } = await params;

  if (!session) {
    redirect("/sign-in");
  }

  const client = await getClientById(clientId);

  if (!client) {
    notFound();
  }

  // Verify client belongs to the organization
  if (client.organizationId !== workspaceId) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6">
      <ClientDetailView client={client} organizationId={workspaceId} />
    </div>
  );
}
