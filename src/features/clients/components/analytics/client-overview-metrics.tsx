"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserPlus,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  UserX,
  Target,
  AlertCircle,
} from "lucide-react";
import { ClientOverviewMetrics } from "../../analytics";

interface ClientOverviewMetricsProps {
  metrics: ClientOverviewMetrics;
}

export function ClientOverviewMetricsComponent({
  metrics,
}: ClientOverviewMetricsProps) {
  const {
    totalClients,
    activeClients,
    newClientsThisMonth,
    clientsAddedLastMonth,
    averageContactsPerClient,
    clientsWithNoContacts,
    clientsWithHighPriority,
    clientsWithCriticalPriority,
  } = metrics;

  const growthRate =
    clientsAddedLastMonth > 0
      ? Math.round(
          ((newClientsThisMonth - clientsAddedLastMonth) /
            clientsAddedLastMonth) *
            100
        )
      : newClientsThisMonth > 0
        ? 100
        : 0;

  const activeClientPercentage =
    totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0;

  const metricsData = [
    {
      title: "Total Clients",
      value: totalClients.toLocaleString(),
      icon: Users,
    },
    {
      title: "Active Clients",
      value: `${activeClients.toLocaleString()} (${activeClientPercentage}%)`,
      icon: UserCheck,
    },
    {
      title: "New This Month",
      value: newClientsThisMonth.toLocaleString(),
      icon: UserPlus,
      growth: growthRate,
    },
    {
      title: "Avg Contacts/Client",
      value: averageContactsPerClient.toString(),
      icon: Target,
    },
  ];

  const alertData = [
    {
      title: "No Contacts",
      value: clientsWithNoContacts,
      icon: UserX,
      severity: clientsWithNoContacts > 0 ? "high" : "none",
    },
    {
      title: "High Priority",
      value: clientsWithHighPriority,
      icon: AlertTriangle,
      severity: clientsWithHighPriority > 0 ? "medium" : "none",
    },
    {
      title: "Critical Priority",
      value: clientsWithCriticalPriority,
      icon: AlertCircle,
      severity: clientsWithCriticalPriority > 0 ? "high" : "none",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              {metric.growth !== undefined && (
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {metric.growth > 0 ? "+" : ""}
                  {metric.growth}% from last month
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alertData.map((alert, index) => (
          <Card
            key={index}
            className={
              alert.severity === "high"
                ? "border-destructive"
                : alert.severity === "medium"
                  ? "border-yellow-500"
                  : ""
            }
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {alert.title}
              </CardTitle>
              <alert.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alert.value}</div>
              {alert.severity !== "none" && (
                <Badge
                  variant={
                    alert.severity === "high" ? "destructive" : "secondary"
                  }
                  className="mt-2"
                >
                  {alert.severity === "high" ? "Needs Attention" : "Monitor"}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Client Health Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <div className="text-muted-foreground">Client Distribution</div>
              <div className="font-medium">
                {activeClientPercentage}% Active, {100 - activeClientPercentage}
                % Inactive
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Contact Coverage</div>
              <div className="font-medium">
                {totalClients - clientsWithNoContacts} of {totalClients} clients
                have contacts
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Priority Distribution</div>
              <div className="font-medium">
                {clientsWithHighPriority + clientsWithCriticalPriority}{" "}
                high/critical priority clients
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
