"use client";

import { useState } from "react";
import { ClientWithContacts } from "../types";
import { ClientOverview } from "./client-overview";
import { ClientContacts } from "./client-contacts";
import { ClientProjects } from "./client-projects";
import { ClientInvoices } from "./client-invoices";
import { ClientActivity } from "./client-activity";
import { ClientDetailHeader } from "./client-detail-header";
import { ClientDetailTabs } from "./client-detail-tabs";

interface ClientDetailViewProps {
  client: ClientWithContacts;
  organizationId: string;
}

type TabType = "overview" | "contacts" | "projects" | "invoices" | "activity";

export function ClientDetailView({
  client,
  organizationId,
}: ClientDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <ClientOverview client={client} organizationId={organizationId} />
        );
      case "contacts":
        return (
          <ClientContacts client={client} organizationId={organizationId} />
        );
      case "projects":
        return (
          <ClientProjects client={client} organizationId={organizationId} />
        );
      case "invoices":
        return (
          <ClientInvoices client={client} organizationId={organizationId} />
        );
      case "activity":
        return (
          <ClientActivity client={client} organizationId={organizationId} />
        );
      default:
        return (
          <ClientOverview client={client} organizationId={organizationId} />
        );
    }
  };

  return (
    <div className="space-y-6">
      <ClientDetailHeader
        client={client}
        organizationId={organizationId}
        onClientUpdate={() => {
          // This will be handled by the parent component
          window.location.reload();
        }}
      />

      <ClientDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
}
