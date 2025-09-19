"use client";

import { ClientWithContacts } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface ClientInvoicesProps {
  client: ClientWithContacts;
  organizationId: string;
}

export function ClientInvoices({
  client,
  organizationId,
}: ClientInvoicesProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-gray-600">Manage invoices for {client.name}</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Invoice</span>
        </Button>
      </div>

      {/* No Invoices State */}
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No invoices yet</h3>
          <p className="mb-4">
            Invoice management will be integrated in a future phase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
