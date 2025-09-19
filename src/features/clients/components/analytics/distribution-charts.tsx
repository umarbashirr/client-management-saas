"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusDistribution, PriorityDistribution } from "../../analytics";

interface DistributionChartsProps {
  statusDistribution: StatusDistribution[];
  priorityDistribution: PriorityDistribution[];
}

export function DistributionCharts({
  statusDistribution,
  priorityDistribution,
}: DistributionChartsProps) {
  const statusColors: Record<string, string> = {
    active: "bg-primary",
    inactive: "bg-muted",
    prospect: "bg-blue-500",
    lead: "bg-yellow-500",
  };

  const priorityColors: Record<string, string> = {
    low: "bg-primary",
    medium: "bg-yellow-500",
    high: "bg-orange-500",
    critical: "bg-destructive",
  };

  const statusLabels: Record<string, string> = {
    active: "Active",
    inactive: "Inactive",
    prospect: "Prospect",
    lead: "Lead",
  };

  const priorityLabels: Record<string, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Client Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusDistribution.map((status, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${status.color}`} />
                    <span className="text-sm font-medium">
                      {statusLabels[status.status] || status.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {status.count} clients
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {status.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${status.color}`}
                    style={{ width: `${status.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Priority Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Client Priority Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {priorityDistribution.map((priority, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                    <span className="text-sm font-medium">
                      {priorityLabels[priority.priority] || priority.priority}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {priority.count} clients
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {priority.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${priority.color}`}
                    style={{ width: `${priority.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
