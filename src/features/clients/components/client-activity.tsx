"use client";

import { ClientWithContacts } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Clock } from "lucide-react";

interface ClientActivityProps {
  client: ClientWithContacts;
  organizationId: string;
}

export function ClientActivity({
  client,
  organizationId,
}: ClientActivityProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Activity</h2>
        <p className="text-gray-600">
          Recent activity and interactions with {client.name}
        </p>
      </div>

      {/* No Activity State */}
      <Card>
        <CardContent className="text-center py-12">
          <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No activity yet</h3>
          <p className="mb-4">
            Activity tracking will be implemented in a future phase.
          </p>
        </CardContent>
      </Card>

      {/* Recent Activity Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Track all interactions and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
              <span>Activity tracking coming soon...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
