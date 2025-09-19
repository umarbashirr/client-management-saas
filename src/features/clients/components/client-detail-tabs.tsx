"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TabType = "overview" | "contacts" | "projects" | "invoices" | "activity";

interface ClientDetailTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "overview" as const, label: "Overview", count: null },
  { id: "contacts" as const, label: "Contacts", count: null },
  { id: "projects" as const, label: "Projects", count: null },
  { id: "invoices" as const, label: "Invoices", count: null },
  { id: "activity" as const, label: "Activity", count: null },
];

export function ClientDetailTabs({
  activeTab,
  onTabChange,
}: ClientDetailTabsProps) {
  return (
    <div className="border-b border-gray-200 rounded-none">
      <nav className="-mb-px flex space-x-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => onTabChange(tab.id)}
            className="rounded-none"
          >
            {tab.label}
            {tab.count !== null && (
              <span className="ml-2 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </Button>
        ))}
      </nav>
    </div>
  );
}
