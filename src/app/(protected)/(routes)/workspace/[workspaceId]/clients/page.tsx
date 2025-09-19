import { ClientTable } from "@/features/clients/components/client-table";
import { getClients } from "@/features/clients/data";
import { getServerSession } from "@/lib/authentication/middleware";
import { redirect } from "next/navigation";

interface ClientsPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function ClientsPage({ params }: ClientsPageProps) {
  const session = await getServerSession();
  const { workspaceId } = await params;
  if (!session) {
    redirect("/sign-in");
  }

  const clients = await getClients(workspaceId);

  return (
    <div className="container mx-auto py-6">
      <ClientTable data={clients} organizationId={workspaceId} />
    </div>
  );
}
